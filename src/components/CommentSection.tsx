import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageSquare, User, Send, LogIn, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import {
  listComments,
  postComment,
  deleteComment,
  type Comment,
  type CommentCursor,
} from '@/lib/commentsApi';
import { errorMessage } from '@/lib/validation';

export function CommentSection({ gameId }: { gameId: string }) {
  const { user, isAdmin, loading: authLoading, isConfigured, openAuth } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursor, setCursor] = useState<CommentCursor | null>(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState(false);
  const generation = useRef(0);
  const request = useRef<AbortController | null>(null);

  const load = useCallback(
    async (next: CommentCursor | null) => {
      if (!isConfigured) return;
      request.current?.abort();
      const controller = new AbortController();
      request.current = controller;
      setLoading(true);
      setError('');
      setLoadError(false);
      try {
        const result = await listComments(gameId, next, controller.signal);
        if (controller.signal.aborted) return;
        setComments((current) =>
          next
            ? [
                ...current,
                ...result.comments.filter(
                  (comment) => !current.some((item) => item.id === comment.id),
                ),
              ]
            : result.comments,
        );
        setCursor(result.nextCursor);
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(errorMessage(cause));
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    },
    [gameId, isConfigured],
  );

  useEffect(() => {
    const current = ++generation.current;
    setNewComment('');
    setComments([]);
    setCursor(null);
    setPending(false);
    setError('');
    void load(null);
    return () => {
      generation.current = current + 1;
      request.current?.abort();
    };
  }, [load]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user || pending || loading || !newComment.trim()) return;
    const current = generation.current;
    setPending(true);
    setError('');
    try {
      const comment = await postComment(gameId, newComment);
      if (current !== generation.current) return;
      setComments((items) => [comment, ...items.filter((item) => item.id !== comment.id)]);
      setNewComment('');
    } catch (cause) {
      if (current === generation.current) setError(errorMessage(cause));
    } finally {
      if (current === generation.current) setPending(false);
    }
  };

  const remove = async (id: string) => {
    if (pending || loading || !window.confirm('Delete this note permanently?')) return;
    const current = generation.current;
    setPending(true);
    setError('');
    try {
      await deleteComment(id);
      if (current === generation.current)
        setComments((items) => items.filter((item) => item.id !== id));
    } catch (cause) {
      if (current === generation.current) setError(errorMessage(cause));
    } finally {
      if (current === generation.current) setPending(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto animate-fade-in" aria-labelledby="notes-title">
      <h3
        id="notes-title"
        className="text-2xl font-display font-bold text-ink-900 flex items-center gap-2 mb-8"
      >
        <MessageSquare className="text-peach-500" />
        Adventurer&apos;s Notes
      </h3>
      {!isConfigured ? (
        <p className="rounded-2xl border-2 border-dashed border-tan-300 p-6 text-tan-600">
          Community notes will be available once Supabase is connected. Walkthrough progress is
          saved on this device.
        </p>
      ) : (
        <>
          <div className="mb-6">
            {user ? (
              <form
                onSubmit={submit}
                className="bg-white p-4 rounded-2xl border-2 border-tan-200 flex flex-col gap-3"
              >
                <label htmlFor="new-note" className="font-semibold">
                  Leave a helpful note for other players
                </label>
                <textarea
                  id="new-note"
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                  maxLength={2000}
                  disabled={pending}
                  required
                  className="form-input min-h-24"
                />
                <div className="flex justify-between items-center gap-3">
                  <span className="text-xs text-tan-600">
                    {newComment.length}/2000 · Notes are public
                  </span>
                  <button
                    type="submit"
                    disabled={!newComment.trim() || pending || loading || authLoading}
                    className="bg-peach-500 text-white font-bold py-2 px-5 rounded-xl flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send size={16} />
                    {pending ? 'Please wait…' : 'Post Note'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-cream-50 border-2 border-dashed border-tan-300 rounded-2xl p-8 text-center flex flex-col items-center">
                <User size={32} className="text-tan-500 mb-4" />
                <h4 className="text-lg font-bold mb-2">Join the conversation</h4>
                <p className="text-tan-600 mb-6">
                  Create an account to leave notes, ask questions, and help fellow gamers.
                </p>
                <button
                  disabled={authLoading}
                  onClick={() => openAuth()}
                  className="bg-earth-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Sign In or Register
                </button>
              </div>
            )}
          </div>
          {error && (
            <div role="alert" className="mb-4 text-red-700">
              <p>{error}</p>
              {loadError && (
                <button
                  onClick={() => void load(cursor)}
                  disabled={loading || pending}
                  className="font-bold underline"
                >
                  Retry loading notes
                </button>
              )}
            </div>
          )}
          {!loading && !error && comments.length === 0 && (
            <p className="text-tan-600">No notes yet. Be the first to help another player!</p>
          )}
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="bg-white p-5 rounded-2xl border border-tan-200 flex gap-4"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-peach-200 flex items-center justify-center font-bold flex-shrink-0"
                >
                  {comment.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="font-bold break-words">{comment.user_name}</span>
                    <time dateTime={comment.created_at} className="text-xs text-tan-600">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="text-ink-800 leading-relaxed whitespace-pre-wrap break-words">
                    {comment.text}
                  </p>
                </div>
                {(user?.id === comment.user_id || isAdmin) && (
                  <button
                    onClick={() => void remove(comment.id)}
                    disabled={pending || loading}
                    aria-label={`Delete note by ${comment.user_name}`}
                    className="self-start text-red-600 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </article>
            ))}
          </div>
          {loading && (
            <p role="status" className="mt-4 text-tan-600">
              Loading notes…
            </p>
          )}
          {cursor && !loading && (
            <button
              disabled={pending}
              onClick={() => void load(cursor)}
              className="mt-5 btn-cozy bg-cream-50 text-tan-600"
            >
              Load more notes
            </button>
          )}
        </>
      )}
    </section>
  );
}
