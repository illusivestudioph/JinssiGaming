import { useState } from 'react';
import { MessageSquare, User, Send, LogIn } from 'lucide-react';

interface Comment {
  id: string;
  user_name: string;
  text: string;
  created_at: string;
}

export function CommentSection({ gameId }: { gameId: string }) {
  // MOCK AUTH STATE: We will replace this with Supabase Auth later
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'mock-1',
      user_name: 'CozyGamer99',
      text: 'This walkthrough saved me! The puzzle on step 4 was so confusing before I saw the picture.',
      created_at: new Date().toISOString(),
    }
  ]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // We will replace this with a Supabase INSERT query later
    const comment: Comment = {
      id: Date.now().toString(),
      user_name: 'Guest Player', // Will pull from Supabase Auth profile
      text: newComment,
      created_at: new Date().toISOString(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-16 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-display font-bold text-ink-900 flex items-center gap-2">
          <MessageSquare className="text-peach-500" />
          Adventurer's Notes
        </h3>
        
        {/* TEMPORARY TESTING BUTTON */}
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="text-xs font-bold text-tan-400 bg-tan-100 px-3 py-1 rounded-full hover:bg-tan-200 transition-colors"
        >
          Toggle Login State (Test)
        </button>
      </div>

      {/* COMMENT INPUT FORM / LOGIN PROMPT */}
      <div className="mb-10">
        {isLoggedIn ? (
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
            <button className="bg-earth-500 hover:bg-earth-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
              <LogIn size={18} /> Sign In or Register
            </button>
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
    </div>
  );
}