-- ==============================================================================
-- Jinssi Gaming: Walkthrough Videos & Media Storage Setup
-- Migration: 009_walkthrough_videos.sql
--
-- Security Model:
-- - READ (SELECT): Public (all site visitors can stream and watch videos)
-- - WRITE (INSERT, UPDATE, DELETE): Strictly ADMIN ONLY (mjhanesultancruz1514@gmail.com)
--   Regular users who sign in to chat or comment CANNOT upload or edit videos.
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

-- 2. Indexes for fast retrieval by game and walkthrough step
CREATE INDEX IF NOT EXISTS idx_walkthrough_videos_game 
ON public.walkthrough_videos(game_id);

CREATE INDEX IF NOT EXISTS idx_walkthrough_videos_step 
ON public.walkthrough_videos(game_id, step_id);

CREATE INDEX IF NOT EXISTS idx_walkthrough_videos_created 
ON public.walkthrough_videos(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.walkthrough_videos ENABLE ROW LEVEL SECURITY;

-- 4. Public READ access: Anyone (visitors & players) can watch walkthrough videos
DROP POLICY IF EXISTS "Allow public read walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Allow public read walkthrough_videos"
ON public.walkthrough_videos FOR SELECT
USING (true);

-- 5. ADMIN ONLY INSERT: Strictly restricted to the verified site admin / creator email
DROP POLICY IF EXISTS "Allow insert walkthrough_videos" ON public.walkthrough_videos;
DROP POLICY IF EXISTS "Admin only insert walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Admin only insert walkthrough_videos"
ON public.walkthrough_videos FOR INSERT
TO authenticated
WITH CHECK (
    auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
);

-- 6. ADMIN ONLY UPDATE: Strictly restricted to the verified site admin / creator email
DROP POLICY IF EXISTS "Allow update walkthrough_videos" ON public.walkthrough_videos;
DROP POLICY IF EXISTS "Admin only update walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Admin only update walkthrough_videos"
ON public.walkthrough_videos FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
)
WITH CHECK (
    auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
);

-- 7. ADMIN ONLY DELETE: Strictly restricted to the verified site admin / creator email
DROP POLICY IF EXISTS "Allow delete walkthrough_videos" ON public.walkthrough_videos;
DROP POLICY IF EXISTS "Admin only delete walkthrough_videos" ON public.walkthrough_videos;
CREATE POLICY "Admin only delete walkthrough_videos"
ON public.walkthrough_videos FOR DELETE
TO authenticated
USING (
    auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
);

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

-- Storage Access Policies:
-- READ: Public (Anyone can load and stream videos & posters)
DROP POLICY IF EXISTS "Anyone can read walkthrough videos" ON storage.objects;
CREATE POLICY "Anyone can read walkthrough videos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id IN ('site-videos', 'site-images'));

-- WRITE (UPLOAD): Strictly ADMIN ONLY (mjhanesultancruz1514@gmail.com)
DROP POLICY IF EXISTS "Anyone can upload walkthrough videos" ON storage.objects;
DROP POLICY IF EXISTS "Admin only upload walkthrough videos" ON storage.objects;
CREATE POLICY "Admin only upload walkthrough videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id IN ('site-videos', 'site-images')
    AND auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
);

-- WRITE (UPDATE): Strictly ADMIN ONLY (mjhanesultancruz1514@gmail.com)
DROP POLICY IF EXISTS "Anyone can update walkthrough videos" ON storage.objects;
DROP POLICY IF EXISTS "Admin only update walkthrough videos" ON storage.objects;
CREATE POLICY "Admin only update walkthrough videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id IN ('site-videos', 'site-images')
    AND auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
);

-- WRITE (DELETE): Strictly ADMIN ONLY (mjhanesultancruz1514@gmail.com)
DROP POLICY IF EXISTS "Anyone can delete walkthrough videos" ON storage.objects;
DROP POLICY IF EXISTS "Admin only delete walkthrough videos" ON storage.objects;
CREATE POLICY "Admin only delete walkthrough videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id IN ('site-videos', 'site-images')
    AND auth.jwt() ->> 'email' = 'mjhanesultancruz1514@gmail.com'
);
