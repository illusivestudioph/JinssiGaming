-- ==============================================================================
-- Jinssi Gaming: Cozy Chat & World Messages Table Setup
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/esjwkwgjnesyvnvuonmd/sql/new
-- ==============================================================================

-- 1. Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    channel TEXT NOT NULL DEFAULT 'world',
    sender_id TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    sender_avatar JSONB DEFAULT '{}'::jsonb,
    receiver_id TEXT,
    receiver_name TEXT,
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index for fast retrieval by channel and date
CREATE INDEX IF NOT EXISTS idx_chat_messages_channel_created 
ON public.chat_messages(channel, created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 4. Allow public read access to messages
DROP POLICY IF EXISTS "Allow public read chat_messages" ON public.chat_messages;
CREATE POLICY "Allow public read chat_messages"
ON public.chat_messages FOR SELECT
USING (true);

-- 5. Allow inserting chat messages
DROP POLICY IF EXISTS "Allow insert chat_messages" ON public.chat_messages;
CREATE POLICY "Allow insert chat_messages"
ON public.chat_messages FOR INSERT
WITH CHECK (true);

-- 6. Allow deleting chat messages (for the automated 7-day cleanup)
DROP POLICY IF EXISTS "Allow delete chat_messages" ON public.chat_messages;
CREATE POLICY "Allow delete chat_messages"
ON public.chat_messages FOR DELETE
USING (true);
