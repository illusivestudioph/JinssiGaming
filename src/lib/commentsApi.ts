import type { Database } from '@/types/database';
import { requireSupabase } from './supabase';
import { commentSchema } from './validation';

export type Comment = Database['public']['Tables']['comments']['Row'];
export type CommentCursor = Pick<Comment, 'id' | 'created_at'>;
const PAGE_SIZE = 20;

export async function listComments(
  gameId: string,
  cursor: CommentCursor | null,
  signal: AbortSignal,
) {
  let query = requireSupabase()
    .from('comments')
    .select('*')
    .eq('game_id', gameId)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(PAGE_SIZE + 1);
  // Keyset pagination remains stable when a new note is posted above this page.
  if (cursor)
    query = query.or(
      `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`,
    );
  const { data, error } = await query.abortSignal(signal);
  if (error) throw error;
  const comments = data.slice(0, PAGE_SIZE);
  return { comments, nextCursor: data.length > PAGE_SIZE ? comments[comments.length - 1] : null };
}

export async function postComment(gameId: string, text: string): Promise<Comment> {
  const { data, error } = await requireSupabase()
    .from('comments')
    .insert({ game_id: gameId, text: commentSchema.parse(text) })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteComment(id: string) {
  const { data, error } = await requireSupabase()
    .from('comments')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();
  if (error) throw error;
  if (!data)
    throw new Error('This note was already removed or you no longer have permission to delete it.');
}
