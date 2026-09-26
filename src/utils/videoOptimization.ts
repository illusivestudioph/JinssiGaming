/**
 * Client-Side Video Optimization & Conversion Utility
 * Automatically converts and compresses uploaded game clips (MP4, MOV, MKV, etc.)
 * directly in the browser to web-optimized WebM (VP9/VP8) or MP4 format,
 * minimizing file size (often 70-90% reduction) while preserving pristine visual crispness.
 * Also extracts an instant high-fidelity WebP poster image for immediate playback preview.
 */

export interface OptimizeVideoOptions {
  maxWidth?: number;
  maxHeight?: number;
  targetFps?: number;
  videoBitsPerSecond?: number;
  generatePoster?: boolean;
  posterTimestamp?: number;
  maxDurationSeconds?: number;
  onProgress?: (progress: VideoOptimizationProgress) => void;
}

export interface VideoOptimizationProgress {
  stage: 'analyzing' | 'extracting-poster' | 'compressing' | 'finalizing' | 'completed' | 'fallback';
  percent: number; // 0 to 100
  originalSize?: number;
  processedSize?: number;
  statusText: string;
}

export interface OptimizedVideoResult {
  videoFile: File;
  posterFile?: File;
  posterUrl?: string;
  originalSize: number;
  optimizedSize: number;
  savedBytes: number;
  savedPercent: number;
  duration: number;
  width: number;
  height: number;
  mimeType: string;
}

/**
 * Format bytes into human-friendly string (e.g. 14.5 MB, 820 KB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Extract a high-quality WebP poster frame from an uploaded video file or video URL.
 */
export async function extractVideoPoster(
  videoSource: File | string,
  timestampSeconds = 0.5,
  maxWidth = 1280
): Promise<File | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    let isRevokeNeeded = false;
    let url = '';

    if (typeof videoSource === 'string') {
      url = videoSource;
    } else {
      url = URL.createObjectURL(videoSource);
      isRevokeNeeded = true;
    }

    const cleanup = () => {
      if (isRevokeNeeded && url) {
        URL.revokeObjectURL(url);
      }
    };

    video.onloadedmetadata = () => {
      const seekTime = Math.min(
        timestampSeconds,
        video.duration > 0.2 ? video.duration / 2 : 0.1
      );
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      try {
        let width = video.videoWidth || 1280;
        let height = video.videoHeight || 720;

        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          cleanup();
          resolve(null);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(video, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            cleanup();
            if (!blob) {
              resolve(null);
              return;
            }

            const baseName = typeof videoSource === 'string'
              ? 'walkthrough-video'
              : videoSource.name.replace(/\.[^/.]+$/, '');
            const posterFile = new File([blob], `${baseName}-poster.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            resolve(posterFile);
          },
          'image/webp',
          0.85
        );
      } catch (err) {
        console.warn('[VideoOptimizer] Poster frame extraction warning:', err);
        cleanup();
        resolve(null);
      }
    };

    video.onerror = () => {
      cleanup();
      resolve(null);
    };

    video.src = url;
  });
}

/**
 * Detect the optimal supported WebM/MP4 codec in the current browser.
 */
function getBestSupportedVideoMimeType(): string {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return '';
  }

  const preferredCodecs = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4',
  ];

  for (const mime of preferredCodecs) {
    if (MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }

  return '';
}

/**
 * Converts and optimizes an uploaded video File to a lightweight, high-fidelity web video.
 * If the browser does not support MediaRecorder or if the video is already compact,
 * it safely falls back to returning the original file along with the generated WebP poster.
 */
export async function convertVideoToWebFormat(
  file: File,
  options: OptimizeVideoOptions = {}
): Promise<OptimizedVideoResult> {
  const {
    maxWidth = 1280, // 720p HD width default - crystal clear for gameplay guides
    maxHeight = 720,
    targetFps = 30,
    videoBitsPerSecond = 2_200_000, // 2.2 Mbps: visually lossless for web gameplay
    generatePoster = true,
    posterTimestamp = 0.5,
    maxDurationSeconds = 180, // clips up to 3 mins
    onProgress,
  } = options;

  const originalSize = file.size;
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  onProgress?.({
    stage: 'analyzing',
    percent: 5,
    originalSize,
    statusText: 'Analyzing video resolution and framerate...',
  });

  // Extract poster frame first
  let posterFile: File | undefined;
  let posterUrl: string | undefined;

  if (generatePoster) {
    onProgress?.({
      stage: 'extracting-poster',
      percent: 15,
      originalSize,
      statusText: 'Generating crisp WebP thumbnail poster...',
    });

    try {
      const poster = await extractVideoPoster(file, posterTimestamp, maxWidth);
      if (poster) {
        posterFile = poster;
        posterUrl = URL.createObjectURL(poster);
      }
    } catch (e) {
      console.warn('[VideoOptimizer] Poster generation non-critical error:', e);
    }
  }

  // Check MediaRecorder & canvas captureStream support
  const targetMime = getBestSupportedVideoMimeType();
  const canvasSupport = typeof document !== 'undefined' && 'captureStream' in HTMLCanvasElement.prototype;

  if (!targetMime || !canvasSupport || typeof MediaRecorder === 'undefined') {
    onProgress?.({
      stage: 'fallback',
      percent: 100,
      originalSize,
      processedSize: originalSize,
      statusText: 'Browser encoding not supported, using web-ready original.',
    });

    return {
      videoFile: file,
      posterFile,
      posterUrl,
      originalSize,
      optimizedSize: originalSize,
      savedBytes: 0,
      savedPercent: 0,
      duration: 0,
      width: 1280,
      height: 720,
      mimeType: file.type || 'video/mp4',
    };
  }

  return new Promise<OptimizedVideoResult>((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };

    video.onerror = () => {
      cleanup();
      onProgress?.({
        stage: 'fallback',
        percent: 100,
        originalSize,
        processedSize: originalSize,
        statusText: 'Using original video file.',
      });

      resolve({
        videoFile: file,
        posterFile,
        posterUrl,
        originalSize,
        optimizedSize: originalSize,
        savedBytes: 0,
        savedPercent: 0,
        duration: 0,
        width: 1280,
        height: 720,
        mimeType: file.type || 'video/mp4',
      });
    };

    video.onloadedmetadata = async () => {
      const rawWidth = video.videoWidth || 1280;
      const rawHeight = video.videoHeight || 720;
      const duration = video.duration || 0;

      // If video duration exceeds max threshold (e.g. over 3 mins), or if file is already WebM and under 10MB
      if (duration > maxDurationSeconds || (file.type.includes('webm') && originalSize < 10 * 1024 * 1024)) {
        cleanup();
        onProgress?.({
          stage: 'completed',
          percent: 100,
          originalSize,
          processedSize: originalSize,
          statusText: 'Video ready for upload.',
        });

        resolve({
          videoFile: file,
          posterFile,
          posterUrl,
          originalSize,
          optimizedSize: originalSize,
          savedBytes: 0,
          savedPercent: 0,
          duration,
          width: rawWidth,
          height: rawHeight,
          mimeType: file.type || 'video/webm',
        });
        return;
      }

      // Calculate constrained dimensions (preserving aspect ratio, keeping dimensions even)
      let width = rawWidth;
      let height = rawHeight;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round((width * ratio) / 2) * 2;
        height = Math.round((height * ratio) / 2) * 2;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        cleanup();
        resolve({
          videoFile: file,
          posterFile,
          posterUrl,
          originalSize,
          optimizedSize: originalSize,
          savedBytes: 0,
          savedPercent: 0,
          duration,
          width: rawWidth,
          height: rawHeight,
          mimeType: file.type || 'video/mp4',
        });
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Capture stream from canvas
      const canvasStream = canvas.captureStream(targetFps);

      // Attempt to attach audio stream if available
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          const source = audioCtx.createMediaElementSource(video);
          const dest = audioCtx.createMediaStreamDestination();
          source.connect(dest);
          const audioTracks = dest.stream.getAudioTracks();
          if (audioTracks.length > 0) {
            canvasStream.addTrack(audioTracks[0]);
          }
        }
      } catch {
        // Proceed without external audio graph if blocked
      }

      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(canvasStream, {
          mimeType: targetMime,
          videoBitsPerSecond,
        });
      } catch (err) {
        console.warn('[VideoOptimizer] MediaRecorder init with bitrate failed, trying default:', err);
        try {
          recorder = new MediaRecorder(canvasStream);
        } catch {
          cleanup();
          resolve({
            videoFile: file,
            posterFile,
            posterUrl,
            originalSize,
            optimizedSize: originalSize,
            savedBytes: 0,
            savedPercent: 0,
            duration,
            width: rawWidth,
            height: rawHeight,
            mimeType: file.type,
          });
          return;
        }
      }

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      let animationFrameId: number;

      const drawLoop = () => {
        if (video.paused || video.ended) return;

        ctx.drawImage(video, 0, 0, width, height);

        if (duration > 0) {
          const currentPercent = Math.min(
            90,
            Math.round(20 + (video.currentTime / duration) * 70)
          );
          onProgress?.({
            stage: 'compressing',
            percent: currentPercent,
            originalSize,
            statusText: `Optimizing video to WebM (${currentPercent}% • ${video.currentTime.toFixed(1)}s / ${duration.toFixed(1)}s)...`,
          });
        }

        animationFrameId = requestAnimationFrame(drawLoop);
      };

      recorder.onstop = () => {
        cancelAnimationFrame(animationFrameId);
        cleanup();

        onProgress?.({
          stage: 'finalizing',
          percent: 95,
          originalSize,
          statusText: 'Assembling web-optimized video...',
        });

        const extension = targetMime.includes('mp4') ? 'mp4' : 'webm';
        const finalBlob = new Blob(chunks, { type: targetMime });

        // If the re-encoded blob is surprisingly larger than the original, keep original
        const isOriginalSmaller = originalSize > 0 && finalBlob.size > originalSize * 1.05;
        const resultBlob = isOriginalSmaller ? file : finalBlob;
        const finalMime = isOriginalSmaller ? file.type : targetMime;
        const finalName = isOriginalSmaller ? file.name : `${baseName}.optimized.${extension}`;

        const optimizedFile = new File([resultBlob], finalName, {
          type: finalMime,
          lastModified: Date.now(),
        });

        const optimizedSize = optimizedFile.size;
        const savedBytes = Math.max(0, originalSize - optimizedSize);
        const savedPercent = originalSize > 0 ? Math.round((savedBytes / originalSize) * 100) : 0;

        console.info(
          `[VideoOptimizer] Converted "${file.name}" (${formatBytes(originalSize)}) -> "${finalName}" (${formatBytes(optimizedSize)}) | Saved ${savedPercent}% (${formatBytes(savedBytes)})`
        );

        onProgress?.({
          stage: 'completed',
          percent: 100,
          originalSize,
          processedSize: optimizedSize,
          statusText: `Optimization complete! Saved ${savedPercent}% (${formatBytes(savedBytes)}).`,
        });

        resolve({
          videoFile: optimizedFile,
          posterFile,
          posterUrl,
          originalSize,
          optimizedSize,
          savedBytes,
          savedPercent,
          duration,
          width,
          height,
          mimeType: finalMime,
        });
      };

      // Start recording
      recorder.start(100); // 100ms slice for fluid buffer accumulation

      video.onended = () => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      };

      try {
        await video.play();
        drawLoop();
      } catch (playErr) {
        console.warn('[VideoOptimizer] Autoplay blocked during transcode:', playErr);
        if (recorder.state === 'recording') recorder.stop();
      }
    };
  });
}
