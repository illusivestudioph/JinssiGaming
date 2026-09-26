import { supabase } from '@/lib/supabase';

export interface WalkthroughVideoRecord {
  id: string;
  game_id: string;
  section_id?: string;
  step_id?: string;
  title: string;
  video_url: string;
  poster_url?: string;
  mime_type?: string;
  original_filename?: string;
  original_size_bytes?: number;
  optimized_size_bytes?: number;
  compression_ratio?: number;
  duration_seconds?: number;
  width?: number;
  height?: number;
  is_placeholder?: boolean;
  placeholder_note?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Upload a video file or poster image to Supabase Storage.
 * Attempts to upload to 'site-videos' bucket first;
 * if 'site-videos' bucket has not yet been initialized in Supabase,
 * safely falls back to 'site-images'.
 */
export async function uploadWalkthroughMedia(
  file: File,
  folder = 'walkthrough-videos'
): Promise<{ publicUrl: string; bucket: string }> {
  const fileExt = file.name.split('.').pop() || (file.type.includes('webp') ? 'webp' : 'webm');
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filePath = `${folder}/${crypto.randomUUID()}-${sanitizedName}`;

  // Try 'site-videos' bucket first
  try {
    const { error: videoBucketError } = await supabase.storage
      .from('site-videos')
      .upload(filePath, file, {
        cacheControl: '31536000',
        contentType: file.type || 'video/webm',
        upsert: false,
      });

    if (!videoBucketError) {
      const { data } = supabase.storage.from('site-videos').getPublicUrl(filePath);
      return { publicUrl: data.publicUrl, bucket: 'site-videos' };
    }
  } catch {
    // Bucket might not exist, proceed to fallback
  }

  // Fallback to existing 'site-images' bucket
  const { error: fallbackError } = await supabase.storage
    .from('site-images')
    .upload(filePath, file, {
      cacheControl: '31536000',
      contentType: file.type || (fileExt === 'webp' ? 'image/webp' : 'video/webm'),
      upsert: false,
    });

  if (fallbackError) {
    throw new Error(`Upload failed: ${fallbackError.message}`);
  }

  const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
  return { publicUrl: data.publicUrl, bucket: 'site-images' };
}

/**
 * Persists video metadata into the `walkthrough_videos` table.
 * If the table has not yet been migrated in Supabase, logs a warning and proceeds
 * so local state / site_content continues without disruption.
 */
export async function saveWalkthroughVideoRecord(
  videoData: WalkthroughVideoRecord
): Promise<WalkthroughVideoRecord | null> {
  try {
    const { data, error } = await supabase
      .from('walkthrough_videos')
      .upsert(videoData)
      .select()
      .maybeSingle();

    if (error) {
      console.warn(
        '[VideoService] Note: walkthrough_videos table record could not be saved to Supabase (table may not be created yet):',
        error.message
      );
      return null;
    }

    return (data as WalkthroughVideoRecord) || null;
  } catch (err) {
    console.warn('[VideoService] Note: Supabase walkthrough_videos table insert caught error:', err);
    return null;
  }
}

/**
 * Fetch all video walkthrough records for a given game.
 */
export async function getWalkthroughVideosForGame(gameId: string): Promise<WalkthroughVideoRecord[]> {
  try {
    const { data, error } = await supabase
      .from('walkthrough_videos')
      .select('*')
      .eq('game_id', gameId);

    if (error || !data) {
      return [];
    }

    return data as WalkthroughVideoRecord[];
  } catch {
    return [];
  }
}
