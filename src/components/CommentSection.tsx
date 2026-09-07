import { useEffect, useState } from 'react';
import { MessageSquare, User, Send, LogIn, X, Heart, Reply } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  user_name: string;
  text: string;
  created_at: string;
  parent_id?: number | null;
}

export function CommentSection({ gameId }: { gameId: string }) {
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { display_name?: string } } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({});
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'sign-in' | 'register'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    void supabase
      .from('comments')
      .select('id, user_name, text, created_at, parent_id')
      .eq('game_id', gameId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Unable to load comments:', error.message);
        setComments((data as Comment[]) || []);
      });

    void supabase
      .from('comment_reactions')
      .select('comment_id, user_id')
      .eq('reaction', 'heart')
      .then(({ data, error }) => {
        if (error) {
          console.error('Unable to load comment reactions:', error.message);
          return;
        }
        const rows = data || [];
        const counts: Record<string, number> = {};
        rows.forEach((row) => {
          const commentId = String(row.comment_id);
          counts[commentId] = (counts[commentId] || 0) + 1;
        });
        setReactionCounts(counts);
        if (user) {
          setLikedComments(new Set(rows.filter((row) => row.user_id === user.id).map((row) => String(row.comment_id))));
        }
      });
  }, [gameId, user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAuthMessage('');
    const result = authMode === 'register'
      ? await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setAuthMessage(result.error.message);
    } else {
      setAuthMessage(authMode === 'register' ? 'Check your email to confirm your account.' : 'Signed in.');
      if (authMode === 'sign-in') setShowAuth(false);
    }
    setBusy(false);
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    const userName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Player';
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
    if (!replyText.trim() || !user) return;
    const userName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Player';
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
      setAuthMode('sign-in');
      setAuthMessage('Sign in to react to notes.');
      setShowAuth(true);
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
        <h3 className="text-2xl font-display font-bold text-ink-900 flex items-center gap-2">
          <MessageSquare className="text-peach-500" />
          Adventurer's Notes
        </h3>
        
        {user && <button onClick={() => void supabase.auth.signOut()} className="text-xs font-bold text-tan-500 hover:text-peach-500">Sign out</button>}
      </div>

      {/* COMMENT INPUT FORM / LOGIN PROMPT */}
      <div className="mb-10">
        {user ? (
          <form onSubmit={handlePostComment} className="notepad-card p-4 flex flex-col gap-3">
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave a helpful note for other players..."
              className="w-full min-h-[100px] p-3 bg-cream-50 rounded-xl border border-tan-200 focus:border-peach-400 focus:outline-none resize-none font-medium"
            />
            <button 
              type="submit"
              disabled={!newComment.trim()}
              className="self-end bg-peach-500 hover:bg-peach-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-xl transition-colors flex items-center gap-2"
            >
              <Send size={16} /> Post Note
            </button>
          </form>
        ) : (
          <div className="notepad-card p-8 text-center flex flex-col items-center justify-center">
            <div className="bg-tan-100 text-tan-500 p-4 rounded-full mb-4">
              <User size={32} />
            </div>
            <h4 className="text-lg font-bold text-ink-900 mb-2">Join the conversation</h4>
            <p className="text-tan-600 mb-6 font-medium">Create a free account to leave comments, ask questions, and help fellow gamers.</p>
            <button onClick={() => { setAuthMode('sign-in'); setAuthMessage(''); setShowAuth(true); }} className="bg-earth-500 hover:bg-earth-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
              <LogIn size={18} /> Sign In or Register
            </button>
            {authMessage && <p className="mt-4 text-sm font-semibold text-rose-500">{authMessage}</p>}
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
        {comments.length === 0 && (
          <p className="notepad-card p-6 text-center text-sm font-semibold text-tan-500">
            No notes yet. Be the first adventurer to leave one.
          </p>
        )}
      </div>

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4 backdrop-blur-sm">
          <form onSubmit={handleAuth} className="notepad-card relative w-full max-w-md p-6 shadow-2xl">
            <button type="button" onClick={() => setShowAuth(false)} className="absolute right-4 top-4 text-tan-500"><X size={20} /></button>
            <h4 className="mb-5 pr-8 text-2xl font-display font-bold text-ink-900">{authMode === 'register' ? 'Create your account' : 'Welcome back'}</h4>
            {authMode === 'register' && <input required value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Display name" className="mb-3 w-full rounded-xl border-2 border-tan-200 bg-white px-4 py-3 focus:border-peach-400 focus:outline-none" />}
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="mb-3 w-full rounded-xl border-2 border-tan-200 bg-white px-4 py-3 focus:border-peach-400 focus:outline-none" />
            <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (6+ characters)" className="mb-4 w-full rounded-xl border-2 border-tan-200 bg-white px-4 py-3 focus:border-peach-400 focus:outline-none" />
            {authMessage && <p className="mb-4 text-sm font-semibold text-rose-500">{authMessage}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-earth-500 py-3 font-bold text-white hover:bg-earth-600 disabled:opacity-50">{busy ? 'Please wait...' : authMode === 'register' ? 'Register' : 'Sign in'}</button>
            <button type="button" onClick={() => { setAuthMode(authMode === 'register' ? 'sign-in' : 'register'); setAuthMessage(''); }} className="mt-4 w-full text-sm font-bold text-tan-600 hover:text-peach-500">{authMode === 'register' ? 'Already have an account? Sign in' : 'Need an account? Register'}</button>
          </form>
        </div>
      )}
    </div>
  );
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
  return (
    <div className="flex flex-col gap-3">
      <article className="notepad-card p-5">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-peach-200 text-lg font-bold text-peach-700">
            {comment.user_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="font-bold text-ink-900">{comment.user_name}</span>
              <span className="text-xs font-semibold text-tan-400">{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="leading-relaxed text-ink-800">{comment.text}</p>
            <div className="mt-3 flex items-center gap-4 text-xs font-bold text-tan-500">
              <button onClick={onHeart} className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-rose-500' : 'hover:text-rose-500'}`}>
                <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} /> {reactionCount || 'Heart'}
              </button>
              <button onClick={onReply} className="flex items-center gap-1 hover:text-peach-500"><Reply size={15} /> Reply</button>
            </div>
          </div>
        </div>
      </article>
      {replying && isLoggedIn && (
        <div className="ml-8 flex gap-2">
          <input value={replyText} onChange={(e) => onReplyTextChange(e.target.value)} placeholder="Write a reply..." className="min-w-0 flex-1 rounded-xl border border-tan-200 bg-cream-50 px-3 py-2 text-sm focus:border-peach-400 focus:outline-none" />
          <button onClick={onSubmitReply} disabled={!replyText.trim()} className="rounded-xl bg-earth-500 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Reply</button>
        </div>
      )}
      {replies.map((reply) => (
        <div key={reply.id} className="ml-8 border-l-2 border-peach-200 pl-4">
          <CommentCard comment={reply} replies={[]} reactionCount={0} isLiked={false} isLoggedIn={isLoggedIn} onHeart={() => undefined} onReply={() => undefined} replying={false} replyText="" onReplyTextChange={() => undefined} onSubmitReply={() => undefined} />
        </div>
      ))}
    </div>
  );
}