-- ==============================================================================
-- Jinssi Gaming: Walkthrough Videos & Media Storage Setup
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/esjwkwgjnesyvnvuonmd/sql/new
-- ==============================================================================

-- 1. Create walkthrough_videos table
CREATE TABLE IF NOT EXISTS public.walkthrough_videos (
    id TEXT PRIMARY KEY,
    game_id TEXT NOT NULL,
    section_id TEXT,
    step_id TEXT,
    title TEXT NOT NULL DEFAULT '',
    video_url TEXT NOT NULL,
    poster_url TEXT,
    mime_type TEXT DEFAULT 'video/webm',
    original_filename TEXT,
    original_size_bytes BIGINT,
    optimized_size_bytes BIGINT,
    compression_ratio NUMERIC(5, 2),
    duration_seconds NUMERIC(10, 2),
    width INTEGER,
    height INTEGER,
    is_placeholder BOOLEAN NOT NULL DEFAULT FALSE,
    placeholder_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for lightning-fast retrieval by game and walkthrough step
CREATE INDEX IF NOT EXISTS idx_walkthrough_videos_game 
ON public.walkthrough_videos(game_id);

CREATE INDEX IF NOT EXISTS idx_walkthrough_videos_step 
ON public.walkthrough_videos(game_id, step_id);

CREATE INDEX IF NOT EXISTS idx_walkthrough_videos_created 
ON public.walkthrough_videos(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.walkthrough_videos ENABLE ROW LEVEL SECURITY;

-- 4. Allow public read access to videos
DROP POLICY IF EXISTS "Allow public read walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Allow public read walkthrough_videos"
ON public.walkthrough_videos FOR SELECT
USING (true);

-- 5. Allow inserting video records
DROP POLICY IF EXISTS "Allow insert walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Allow insert walkthrough_videos"
ON public.walkthrough_videos FOR INSERT
WITH CHECK (true);

-- 6. Allow updating video records
DROP POLICY IF EXISTS "Allow update walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Allow update walkthrough_videos"
ON public.walkthrough_videos FOR UPDATE
USING (true)
WITH CHECK (true);

-- 7. Allow deleting video records
DROP POLICY IF EXISTS "Allow delete walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Allow delete walkthrough_videos"
ON public.walkthrough_videos FOR DELETE
USING (true);

-- ==============================================================================
-- 8. Storage Bucket Setup (site-videos)
-- Creates the public storage bucket for web-optimized video walkthrough clips
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'site-videos',
    'site-videos',
    true,
    104857600, -- 100MB max per video file (typical web-optimized clips are 2-15MB)
    ARRAY['video/webm', 'video/mp4', 'video/quicktime', 'image/webp', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 104857600,
    allowed_mime_types = ARRAY['video/webm', 'video/mp4', 'video/quicktime', 'image/webp', 'image/jpeg', 'image/png'];

-- Storage Access Policies
DROP POLICY IF EXISTS "Anyone can read walkthrough videos" ON storage.objects;
CREATE POLICY "Anyone can read walkthrough videos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id IN ('site-videos', 'site-images'));

DROP POLICY IF EXISTS "Anyone can upload walkthrough videos" ON storage.objects;
CREATE POLICY "Anyone can upload walkthrough videos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id IN ('site-videos', 'site-images'));

DROP POLICY IF EXISTS "Anyone can update walkthrough videos" ON storage.objects;
CREATE POLICY "Anyone can update walkthrough videos"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id IN ('site-videos', 'site-images'));

DROP POLICY IF EXISTS "Anyone can delete walkthrough videos" ON storage.objects;
CREATE POLICY "Anyone can delete walkthrough videos"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id IN ('site-videos', 'site-images'));
