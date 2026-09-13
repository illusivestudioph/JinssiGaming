import { useEffect, useState } from 'react';
import { MessageSquare, User, Send, Heart, Reply, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';

interface Comment {
  id: string;
  user_name: string;
  text: string;
  created_at: string;
  parent_id?: number | null;
}

export function CommentSection({ gameId }: { gameId: string }) {
  const { user, profile, triggerAuthPrompt, signOut } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({});
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const PAGE_SIZE = 15;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchCommentsPage = async (pageNum: number, isAppend = false) => {
    if (isAppend) setLoadingMore(true);
    const from = pageNum * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('comments')
      .select('id, user_name, text, created_at, parent_id')
      .eq('game_id', gameId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Unable to load comments:', error.message);
      if (isAppend) setLoadingMore(false);
      return;
    }

    const fetched = (data as Comment[]) || [];
    setHasMore(fetched.length === PAGE_SIZE);

    setComments((prev) => {
      const merged = isAppend ? [...prev, ...fetched] : fetched;

      // Scoped reactions query: only query reactions for visible comments
      const commentIds = merged.map((c) => c.id);
      if (commentIds.length > 0) {
        void supabase
          .from('comment_reactions')
          .select('comment_id, user_id')
          .in('comment_id', commentIds)
          .eq('reaction', 'heart')
          .then(({ data: reactionData, error: reactionError }) => {
            if (reactionError) {
              console.error('Unable to load comment reactions:', reactionError.message);
              return;
            }
            const rows = reactionData || [];
            const counts: Record<string, number> = {};
            rows.forEach((row) => {
              const commentId = String(row.comment_id);
              counts[commentId] = (counts[commentId] || 0) + 1;
            });
            setReactionCounts(counts);
            if (user) {
              setLikedComments(
                new Set(
                  rows
                    .filter((row) => row.user_id === user.id)
                    .map((row) => String(row.comment_id))
                )
              );
            }
          });
      }

      return merged;
    });

    if (isAppend) {
      setPage(pageNum);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(0);
    void fetchCommentsPage(0, false);
  }, [gameId, user]);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    void fetchCommentsPage(page + 1, true);
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to post comments and join the discussion!');
      return;
    }
    const userName = profile.username || user.email?.split('@')[0] || 'Player';
    const { data, error } = await supabase.from('comments').insert({
      game_id: gameId,
      user_id: user.id,
      user_name: userName,
      text: newComment.trim(),
    }).select('id, user_name, text, created_at, parent_id').single();
    if (error) {
      setAuthMessage(error.message);
      return;
    }
    setComments((current) => [data as Comment, ...current]);
    setNewComment('');
  };

  const postReply = async (commentId: string) => {
    if (!replyText.trim()) return;
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to reply to fellow adventurers!');
      return;
    }
    const userName = profile.username || user.email?.split('@')[0] || 'Player';
    const { data, error } = await supabase.from('comments').insert({
      game_id: gameId,
      user_id: user.id,
      user_name: userName,
      text: replyText.trim(),
      parent_id: Number(commentId),
    }).select('id, user_name, text, created_at, parent_id').single();
    if (error) {
      setAuthMessage(error.message);
      return;
    }
    setComments((current) => [...current, data as Comment]);
    setReplyText('');
    setReplyingTo(null);
  };

  const toggleHeart = async (commentId: string) => {
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to react to notes with a heart!');
      return;
    }
    const isLiked = likedComments.has(commentId);
    const query = supabase.from('comment_reactions');
    const result = isLiked
      ? await query.delete().match({ comment_id: Number(commentId), user_id: user.id, reaction: 'heart' })
      : await query.insert({ comment_id: Number(commentId), user_id: user.id, reaction: 'heart' });
    if (result.error) {
      setAuthMessage(result.error.message);
      return;
    }
    setLikedComments((current) => {
      const next = new Set(current);
      if (isLiked) next.delete(commentId); else next.add(commentId);
      return next;
    });
    setReactionCounts((current) => ({ ...current, [commentId]: Math.max(0, (current[commentId] || 0) + (isLiked ? -1 : 1)) }));
  };

  const topLevelComments = comments.filter((comment) => !comment.parent_id);

  return (
    <div className="mt-16 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display font-bold text-ink-900 dark:text-cream-50 flex items-center gap-2">
          <MessageSquare className="text-peach-500" />
          Adventurer's Notes
        </h3>
        
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-tan-600 dark:text-tan-400">
              Posting as <span className="text-peach-600">@{profile.username}</span>
            </span>
            <button onClick={() => void signOut()} className="text-xs font-bold text-tan-500 hover:text-rose-500 transition-colors">
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* COMMENT INPUT FORM / LOGIN PROMPT */}
      <div className="mb-10">
        {user ? (
          <form onSubmit={handlePostComment} className="notepad-card p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-tan-200/60">
              <CozyAvatar config={profile.avatarConfig} size={32} />
              <div>
                <span className="text-xs font-bold text-ink-900 block">@{profile.username}</span>
                <span className="text-[10px] text-tan-500 block">{profile.badge}</span>
              </div>
            </div>
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a helpful note or strategy for other players..."
              className="w-full min-h-[90px] p-3 bg-cream-50 rounded-xl border border-tan-200 focus:border-peach-400 focus:outline-none resize-none font-medium text-xs"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="site-button self-end bg-peach-500 text-white hover:bg-peach-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Send size={14} /> Post Note
            </button>
          </form>
        ) : (
          <div className="notepad-card p-6 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-peach-100 text-peach-600 flex items-center justify-center mb-3 shadow-xs">
              <Sparkles size={24} />
            </div>
            <h4 className="text-base font-bold text-ink-900 mb-1">Join the conversation</h4>
            <p className="text-xs text-tan-600 mb-4 max-w-sm">
              Sign in with your Gmail account to leave comments, ask questions, and share strategies with fellow adventurers.
            </p>
            <button
              type="button"
              onClick={() => triggerAuthPrompt('Sign in with Gmail to post notes and join the discussion!')}
              className="site-button bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-cozy-xs transition-transform active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#ffffff"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#ffffff"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#ffffff"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#ffffff"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google to Post</span>
            </button>
          </div>
        )}
      </div>

      {/* COMMENT LIST */}
      <div className="flex flex-col gap-4">
        {topLevelComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            replies={comments.filter((reply) => reply.parent_id === Number(comment.id))}
            reactionCount={reactionCounts[String(comment.id)] || 0}
            isLiked={likedComments.has(String(comment.id))}
            isLoggedIn={!!user}
            onHeart={() => void toggleHeart(String(comment.id))}
            onReply={() => setReplyingTo(String(comment.id))}
            replying={replyingTo === String(comment.id)}
            replyText={replyText}
            onReplyTextChange={setReplyText}
            onSubmitReply={() => void postReply(String(comment.id))}
          />
        ))}
        {hasMore && (
          <div className="text-center pt-2">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="site-button bg-cream-100 hover:bg-cream-200 border border-tan-200 text-xs font-bold text-tan-700 px-4 py-2 rounded-xl transition-all shadow-cozy-xs"
            >
              {loadingMore ? 'Loading older notes...' : 'Load more notes'}
            </button>
          </div>
        )}
        {comments.length === 0 && (
          <p className="notepad-card p-6 text-center text-sm font-semibold text-tan-500">
            No notes yet. Be the first adventurer to leave one.
          </p>
        )}
      </div>
    </div>
  );
}

function getArchetypeFromName(name: string): any {
  const archetypes = ['cat', 'bear', 'fox', 'owl', 'gamer', 'bunny', 'frog'];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return archetypes[sum % archetypes.length];
}

function CommentCard({
  comment,
  replies,
  reactionCount,
  isLiked,
  isLoggedIn,
  onHeart,
  onReply,
  replying,
  replyText,
  onReplyTextChange,
  onSubmitReply,
}: {
  comment: Comment;
  replies: Comment[];
  reactionCount: number;
  isLiked: boolean;
  isLoggedIn: boolean;
  onHeart: () => void;
  onReply: () => void;
  replying: boolean;
  replyText: string;
  onReplyTextChange: (value: string) => void;
  onSubmitReply: () => void;
}) {
  const archetype = getArchetypeFromName(comment.user_name);

  return (
    <div className="flex flex-col gap-3">
      <article className="notepad-card p-4 sm:p-5">
        <div className="flex gap-3 sm:gap-4">
          <CozyAvatar
            config={{ archetype, accessory: 'sprout', bgColor: 'peach' }}
            size={38}
            className="shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="font-bold text-ink-900 text-xs sm:text-sm">
                {comment.user_name.startsWith('@') ? comment.user_name : `@${comment.user_name}`}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-tan-400">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="leading-relaxed text-ink-800 text-xs sm:text-sm font-medium">{comment.text}</p>
            <div className="mt-2.5 flex items-center gap-4 text-xs font-bold text-tan-500">
              <button
                type="button"
                onClick={onHeart}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                }`}
              >
                <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                <span>{reactionCount > 0 ? reactionCount : 'Heart'}</span>
              </button>
              <button
                type="button"
                onClick={onReply}
                className="flex items-center gap-1 hover:text-peach-500 transition-colors"
              >
                <Reply size={14} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      </article>
      {replying && isLoggedIn && (
        <div className="ml-8 flex gap-2">
          <input
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            placeholder="Write a reply..."
            className="min-w-0 flex-1 rounded-xl border border-tan-200 bg-cream-50 px-3 py-2 text-xs focus:border-peach-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onSubmitReply}
            disabled={!replyText.trim()}
            className="rounded-xl bg-peach-500 hover:bg-peach-600 px-3.5 py-2 text-xs font-bold text-white disabled:opacity-50 transition-colors shadow-xs"
          >
            Reply
          </button>
        </div>
      )}
      {replies.map((reply) => (
        <div key={reply.id} className="ml-8 border-l-2 border-peach-200 pl-3">
          <CommentCard
            comment={reply}
            replies={[]}
            reactionCount={0}
            isLiked={false}
            isLoggedIn={isLoggedIn}
            onHeart={() => undefined}
            onReply={() => undefined}
            replying={false}
            replyText=""
            onReplyTextChange={() => undefined}
            onSubmitReply={() => undefined}
          />
        </div>
      ))}
    </div>
  );
}