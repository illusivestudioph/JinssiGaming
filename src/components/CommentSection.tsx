import { useEffect, useState } from 'react';
import { MessageSquare, User, Send, LogIn, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  user_name: string;
  text: string;
  created_at: string;
}

export function CommentSection({ gameId }: { gameId: string }) {
  const [user, setUser] = useState<{ id: string; email?: string; user_metadata?: { display_name?: string } } | null>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
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
      .select('id, user_name, text, created_at')
      .eq('game_id', gameId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Unable to load comments:', error.message);
        setComments((data as Comment[]) || []);
      });
  }, [gameId]);

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
    }).select('id, user_name, text, created_at').single();
    if (error) {
      setAuthMessage(error.message);
      return;
    }
    setComments((current) => [data as Comment, ...current]);
    setNewComment('');
  };

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
          <form onSubmit={handlePostComment} className="bg-white p-4 rounded-2xl border-2 border-tan-200 shadow-sm flex flex-col gap-3">
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
          <div className="bg-cream-50 border-2 border-dashed border-tan-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
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
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-5 rounded-2xl border border-tan-200 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-peach-200 text-peach-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {comment.user_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-ink-900">{comment.user_name}</span>
                <span className="text-xs text-tan-400 font-semibold">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-ink-800 leading-relaxed">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4 backdrop-blur-sm">
          <form onSubmit={handleAuth} className="relative w-full max-w-md rounded-2xl border-2 border-tan-200 bg-cream-50 p-6 shadow-2xl">
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