/**
 * Client-Side Image Optimization Utility
 * Automatically converts any user/admin uploaded image (PNG, JPEG, etc.)
 * to high-quality WebP format directly in the browser before sending to Supabase Storage.
 *
 * Benefits:
 * - 85-95% smaller file sizes with visually indistinguishable fidelity
 * - Dramatically faster uploads and lightning-fast page/walkthrough loading
 * - Prevents UI hitching and huge bandwidth consumption
 */

export interface OptimizeImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

/**
 * Converts an uploaded File to an optimized WebP File.
 * If the file is not an image (or is SVG/GIF), it returns the original file untouched.
 */
export async function convertImageToWebp(
  file: File,
  options: OptimizeImageOptions = {}
): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.82 } = options;

  // Only process standard raster image types
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Scale down keeping aspect ratio if larger than max dimensions
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      // Smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // Replace existing extension with .webp
          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const newFileName = `${baseName}.webp`;

          const webpFile = new File([blob], newFileName, {
            type: 'image/webp',
            lastModified: Date.now(),
          });

          console.info(
            `[ImageOptimizer] Converted "${file.name}" (${(file.size / 1024).toFixed(1)} KB, ${img.naturalWidth}x${img.naturalHeight}) -> "${newFileName}" (${(webpFile.size / 1024).toFixed(1)} KB, ${width}x${height})`
          );

          resolve(webpFile);
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // If error loading image, fallback to original file
      resolve(file);
    };

    img.src = objectUrl;
  });
}
export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'origin';
  resize?: 'cover' | 'contain' | 'fill';
}

/**
 * Transforms an image URL to use Supabase Storage Image Transformation API or CDN resizing.
 * Automatically appends width, height, quality=80, and format=webp query parameters
 * to dramatically reduce payload size down to under 50-100KB per image.
 */
export function getOptimizedImageUrl(
  url: string | undefined | null,
  options: ImageTransformOptions = {}
): string {
  if (!url || typeof url !== 'string') return '';
  const { width = 600, height, quality = 80, format = 'webp' } = options;

  try {
    // 1. Supabase Storage Transformations: route to built-in render/image endpoint
    if (url.includes('/storage/v1/object/public/') || url.includes('/storage/v1/render/image/public/')) {
      const renderEndpointUrl = url.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/'
      );
      const urlObj = new URL(renderEndpointUrl);
      urlObj.searchParams.set('width', width.toString());
      if (height) urlObj.searchParams.set('height', height.toString());
      urlObj.searchParams.set('quality', quality.toString());
      urlObj.searchParams.set('format', format);
      return urlObj.toString();
    }

    // 2. Unsplash Dynamic Optimization
    if (url.includes('images.unsplash.com')) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      if (height) urlObj.searchParams.set('h', height.toString());
      urlObj.searchParams.set('q', quality.toString());
      urlObj.searchParams.set('auto', 'format');
      return urlObj.toString();
    }

    // 3. Pexels Dynamic Optimization
    if (url.includes('images.pexels.com')) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      if (height) urlObj.searchParams.set('h', height.toString());
      urlObj.searchParams.set('auto', 'compress');
      urlObj.searchParams.set('cs', 'tinysrgb');
      return urlObj.toString();
    }

    // 4. Steam Community / Akamai CDN Optimization (e.g. ss_dfd3c87..., ss_7d2880...)
    if (url.includes('steamstatic.com') || url.includes('steamcontent.com')) {
      if (width <= 800 && url.includes('.1920x1080.jpg')) {
        return url.replace('.1920x1080.jpg', '.600x338.jpg');
      }
      return url;
    }

    return url;
  } catch {
    return url;
  }
}
