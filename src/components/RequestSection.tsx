import { useState, useMemo } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { useAuth } from '@/context/AuthContext';
import { isCreatorEmail } from '@/types/profile';
import type { RequestType, RequestStatus } from '@/types/request';
import { requestTypeLabels, requestStatusLabels } from '@/types/request';
import {
  StreamlineHeart as Heart,
  StreamlinePlus as Plus,
  StreamlineSearch as Search,
  StreamlineSparkles as Sparkles,
  StreamlineCheck as Check,
  StreamlineExternalLink as ExternalLink,
  StreamlineTrash as Trash2,
  StreamlineEdit as Edit2,
  StreamlineClose as Close,
  StreamlineMessageSquare as MessageSquare,
} from '@/components/StreamlineIcons';

interface RequestSectionProps {
  onNavigateToBookshelf?: () => void;
  onNavigateToWalkthroughs?: () => void;
}

export function RequestSection({
  onNavigateToBookshelf,
  onNavigateToWalkthroughs,
}: RequestSectionProps) {
  const { requests, addRequest, upvoteRequest, updateRequestStatus, removeRequest } = useSiteContent();
  const { user, profile } = useAuth();

  const isDev = Boolean(user?.email && isCreatorEmail(user.email) && profile.isCreator);

  // Filter and search state
  const [selectedType, setSelectedType] = useState<RequestType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'upvotes' | 'newest'>('upvotes');

  // Modal / Form state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<RequestType>('book');
  const [formDescription, setFormDescription] = useState('');
  const [formSourceUrl, setFormSourceUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formRequesterName, setFormRequesterName] = useState(
    profile.username || (user?.email ? user.email.split('@')[0] : '')
  );
  const [formRequesterEmail, setFormRequesterEmail] = useState(user?.email || '');

  // Admin note inline editing
  const [editingAdminNoteId, setEditingAdminNoteId] = useState<string | null>(null);
  const [adminNoteText, setAdminNoteText] = useState('');

  // Persistent visitor voter ID
  const voterId = useMemo(() => {
    if (user?.email) return user.email;
    let local = localStorage.getItem('jinssi-visitor-voter-id');
    if (!local) {
      local = `visitor-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('jinssi-visitor-voter-id', local);
    }
    return local;
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    addRequest({
      title: formTitle.trim(),
      type: formType,
      description: formDescription.trim(),
      sourceUrl: formSourceUrl.trim() || undefined,
      authorOrDev: formAuthor.trim() || undefined,
      requesterName: formRequesterName.trim() || 'Cozy Visitor',
      requesterEmail: formRequesterEmail.trim() || undefined,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
      setFormTitle('');
      setFormDescription('');
      setFormSourceUrl('');
      setFormAuthor('');
    }, 1400);
  };

  const filteredRequests = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return requests
      .filter((req) => {
        if (selectedType !== 'all' && req.type !== selectedType) return false;
        if (selectedStatus !== 'all' && req.status !== selectedStatus) return false;
        if (!q) return true;
        return (
          req.title.toLowerCase().includes(q) ||
          req.description.toLowerCase().includes(q) ||
          (req.authorOrDev && req.authorOrDev.toLowerCase().includes(q)) ||
          req.requesterName.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [requests, selectedType, selectedStatus, searchQuery, sortBy]);

  const stats = useMemo(() => {
    const total = requests.length;
    const fulfilled = requests.filter((r) => r.status === 'fulfilled').length;
    const inProgress = requests.filter((r) => r.status === 'in-progress').length;
    const pending = requests.filter((r) => r.status === 'pending').length;
    return { total, fulfilled, inProgress, pending };
  }, [requests]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Top Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-peach-100 text-peach-800 text-xs font-bold mb-3 shadow-cozy-sm border border-peach-200">
          <Sparkles className="w-4 h-4 text-peach-600 animate-pulse-gentle" />
          <span>Community Wishlist & Suggestions</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Community Requests & Sanctuary
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans max-w-2xl mx-auto">
          Want a specific book, web-novel, cozy game walkthrough, or cozy guide added to Jinssi?
          Submit your request below or upvote what fellow readers and gamers are eager to see next!
        </p>

        {/* Quick Action Button & Highlights */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="site-button bg-peach-500 hover:bg-peach-600 text-white font-bold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 shadow-cozy-sm active:scale-95 transition-transform"
          >
            <Plus size={18} />
            <span>Submit a Request</span>
          </button>
        </div>

        {/* Stats counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8">
          <div className="p-3 bg-cream-50 rounded-2xl border border-tan-200 text-center shadow-cozy-xs">
            <span className="text-xl font-bold font-display text-ink-900 block">{stats.total}</span>
            <span className="text-[11px] text-tan-600 font-bold uppercase tracking-wider">Total Requests</span>
          </div>
          <div className="p-3 bg-cream-50 rounded-2xl border border-tan-200 text-center shadow-cozy-xs">
            <span className="text-xl font-bold font-display text-peach-600 block">{stats.inProgress}</span>
            <span className="text-[11px] text-peach-700 font-bold uppercase tracking-wider">In Progress ☕</span>
          </div>
          <div className="p-3 bg-cream-50 rounded-2xl border border-tan-200 text-center shadow-cozy-xs">
            <span className="text-xl font-bold font-display text-green-700 block">{stats.fulfilled}</span>
            <span className="text-[11px] text-green-800 font-bold uppercase tracking-wider">Added ✨</span>
          </div>
          <div className="p-3 bg-cream-50 rounded-2xl border border-tan-200 text-center shadow-cozy-xs">
            <span className="text-xl font-bold font-display text-tan-700 block">{stats.pending}</span>
            <span className="text-[11px] text-tan-600 font-bold uppercase tracking-wider">Under Review</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="notepad-card p-4 sm:p-6 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-tan-400" />
            <input
              type="text"
              placeholder="Search requests by title, author, game, or submitter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="site-input pl-10 pr-4 py-2.5 w-full text-sm rounded-xl"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-ink-800">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'upvotes' | 'newest')}
              className="site-input py-2 px-3 text-xs rounded-xl font-bold"
            >
              <option value="upvotes">🔥 Most Upvoted</option>
              <option value="newest">✨ Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-tan-100">
          <span className="text-xs font-bold text-tan-600 mr-1">Type:</span>
          {(['all', 'book', 'game', 'guide', 'other'] as const).map((type) => {
            const isActive = selectedType === type;
            const label = type === 'all' ? 'All Types' : requestTypeLabels[type].label;
            const icon = type === 'all' ? '🌟' : requestTypeLabels[type].iconEmoji;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-peach-500 text-white shadow-cozy-xs scale-105'
                    : 'bg-cream-100 text-ink-700 hover:bg-cream-200 border border-tan-200'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-tan-600 mr-1">Status:</span>
          {(['all', 'pending', 'in-progress', 'fulfilled'] as const).map((status) => {
            const isActive = selectedStatus === status;
            const label = status === 'all' ? 'All Status' : requestStatusLabels[status].label;
            const icon = status === 'all' ? '📋' : requestStatusLabels[status].iconEmoji;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-earth-600 text-white shadow-cozy-xs scale-105'
                    : 'bg-cream-100 text-ink-700 hover:bg-cream-200 border border-tan-200'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="notepad-card p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-peach-100 text-peach-600 mx-auto flex items-center justify-center shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl text-ink-900">No requests found</h3>
          <p className="text-xs text-tan-600 font-sans">
            {searchQuery
              ? `No requests match "${searchQuery}". Be the first to submit it!`
              : 'There are currently no requests in this category. Submit one now!'}
          </p>
          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="site-button bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-cozy-xs inline-flex items-center gap-1.5"
          >
            <Plus size={16} /> Submit New Request
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredRequests.map((req) => {
            const typeInfo = requestTypeLabels[req.type];
            const statusInfo = requestStatusLabels[req.status];
            const hasUpvoted = req.upvotedBy?.includes(voterId);

            return (
              <div
                key={req.id}
                className="notepad-card p-5 sm:p-6 flex flex-col justify-between hover:shadow-cozy-md transition-shadow relative group"
              >
                <div className="space-y-3">
                  {/* Card Header: Type Badge & Status Badge */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${typeInfo.badgeClass}`}
                    >
                      <span>{typeInfo.iconEmoji}</span>
                      <span>{typeInfo.label}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusInfo.badgeClass}`}
                    >
                      <span>{statusInfo.iconEmoji}</span>
                      <span>{statusInfo.label}</span>
                    </span>
                  </div>

                  {/* Title & Author */}
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-ink-900 leading-snug">
                      {req.title}
                    </h3>
                    {req.authorOrDev && (
                      <p className="text-xs text-peach-700 font-semibold mt-0.5">
                        By / Developed by: {req.authorOrDev}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {req.description && (
                    <p className="text-xs text-ink-700 font-sans leading-relaxed line-clamp-3">
                      {req.description}
                    </p>
                  )}

                  {/* Source / Reference URL */}
                  {req.sourceUrl && (
                    <div className="pt-1">
                      <a
                        href={req.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-earth-700 hover:text-earth-900 font-bold underline underline-offset-2 break-all"
                      >
                        <ExternalLink size={12} />
                        <span>Source / Reference Link</span>
                      </a>
                    </div>
                  )}

                  {/* Admin Note Callout */}
                  {req.adminNote && (
                    <div className="p-3 bg-peach-50 rounded-xl border border-peach-200/80 text-xs text-peach-900 font-sans space-y-1">
                      <div className="font-bold flex items-center gap-1 text-[11px] text-peach-800 uppercase tracking-wider">
                        <span>💬 Developer Note:</span>
                      </div>
                      <p className="italic text-peach-900">{req.adminNote}</p>
                    </div>
                  )}

                  {/* Direct Fulfilled Navigation Link */}
                  {req.status === 'fulfilled' && (
                    <div className="pt-2">
                      {req.type === 'book' && onNavigateToBookshelf && (
                        <button
                          type="button"
                          onClick={onNavigateToBookshelf}
                          className="w-full py-2 px-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-cozy-xs"
                        >
                          <span>📖 Read in Free Bookshelf</span>
                        </button>
                      )}
                      {req.type === 'game' && onNavigateToWalkthroughs && (
                        <button
                          type="button"
                          onClick={onNavigateToWalkthroughs}
                          className="w-full py-2 px-3 rounded-xl bg-earth-500 hover:bg-earth-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-cozy-xs"
                        >
                          <span>🎮 View Game Walkthroughs</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Requester info & Upvote Button */}
                <div className="mt-5 pt-3 border-t border-tan-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-tan-600 font-sans truncate">
                    <span>Requested by </span>
                    <strong className="text-ink-800">{req.requesterName}</strong>
                    <span> • {new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Upvote button */}
                    <button
                      type="button"
                      onClick={() => upvoteRequest(req.id, voterId)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                        hasUpvoted
                          ? 'bg-peach-500 text-white shadow-cozy-sm'
                          : 'bg-cream-100 hover:bg-peach-50 text-ink-800 border border-tan-200'
                      }`}
                      title={hasUpvoted ? 'Remove upvote' : 'Upvote this request'}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current text-white' : 'text-peach-500'}`}
                      />
                      <span>{req.upvotes}</span>
                    </button>
                  </div>
                </div>

                {/* Developer Admin Inline Controls */}
                {isDev && (
                  <div className="mt-3 pt-3 border-t border-dashed border-tan-200 flex flex-wrap items-center justify-between gap-2 bg-cream-50/70 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-tan-600">Admin:</span>
                      <select
                        value={req.status}
                        onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                        className="text-[11px] font-bold bg-white border border-tan-300 rounded-lg px-2 py-1"
                      >
                        <option value="pending">⏳ Under Review</option>
                        <option value="in-progress">☕ In Progress</option>
                        <option value="fulfilled">✨ Added to Site</option>
                        <option value="declined">📌 On Hold</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAdminNoteId(req.id);
                          setAdminNoteText(req.adminNote || '');
                        }}
                        className="text-[10px] font-bold text-earth-700 hover:bg-earth-100 px-2 py-1 rounded flex items-center gap-1"
                        title="Add or update developer note"
                      >
                        <Edit2 size={12} /> Note
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete request "${req.title}"?`)) {
                            removeRequest(req.id);
                          }
                        }}
                        className="text-[10px] font-bold text-red-600 hover:bg-red-100 px-2 py-1 rounded"
                        title="Delete request"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {/* Inline note editor */}
                    {editingAdminNoteId === req.id && (
                      <div className="w-full mt-2 pt-2 border-t border-tan-200 space-y-2">
                        <input
                          type="text"
                          placeholder="Write dev response or progress note..."
                          value={adminNoteText}
                          onChange={(e) => setAdminNoteText(e.target.value)}
                          className="w-full text-xs site-input py-1.5 px-2.5 rounded-lg"
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingAdminNoteId(null)}
                            className="text-[11px] font-bold px-2.5 py-1 rounded bg-tan-200 text-ink-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateRequestStatus(req.id, req.status, adminNoteText.trim());
                              setEditingAdminNoteId(null);
                            }}
                            className="text-[11px] font-bold px-2.5 py-1 rounded bg-peach-500 text-white"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
          <div className="notepad-card max-w-lg w-full p-6 sm:p-8 space-y-5 bg-cream-50 shadow-2xl border-2 border-peach-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 p-2 text-tan-400 hover:text-ink-900 rounded-full hover:bg-cream-100 transition-colors"
            >
              <Close size={18} />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-peach-100 text-peach-600 mx-auto flex items-center justify-center shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-2xl text-ink-900">
                Submit a Community Request
              </h2>
              <p className="text-xs text-tan-600 font-sans">
                Tell us what book, web-novel, cozy game, or guide you’d like to see on Jinssi.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="p-8 text-center space-y-3 bg-green-50 rounded-2xl border border-green-200 animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-green-900">
                  Request Submitted! ✨
                </h3>
                <p className="text-xs text-green-800">
                  Thank you! Your request is now live in the sanctuary for the community to upvote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Selection */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                    Request Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['book', 'game', 'guide', 'other'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormType(t)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center gap-1 ${
                          formType === t
                            ? 'bg-peach-500 text-white shadow-cozy-sm ring-2 ring-peach-300'
                            : 'bg-white border border-tan-200 text-ink-800 hover:bg-cream-100'
                        }`}
                      >
                        <span className="text-sm">{requestTypeLabels[t].iconEmoji}</span>
                        <span className="text-[11px] truncate w-full">{requestTypeLabels[t].label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                    Title / Game / Book Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Great Gatsby, Rusty's Retirement, Fields of Mistria..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="site-input w-full py-2.5 px-3 rounded-xl text-sm"
                  />
                </div>

                {/* Author or Developer */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                    Author, Studio, or Developer (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. F. Scott Fitzgerald, ConcernedApe, Nintendo..."
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="site-input w-full py-2 px-3 rounded-xl text-xs"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                    Why do you want this added?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what specific chapters, levels, or features you're looking forward to..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="site-input w-full p-3 rounded-xl text-xs resize-none"
                  />
                </div>

                {/* Source or reference URL */}
                <div>
                  <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                    Source Link / Reference URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. Project Gutenberg link, Steam page, or Goodreads URL"
                    value={formSourceUrl}
                    onChange={(e) => setFormSourceUrl(e.target.value)}
                    className="site-input w-full py-2 px-3 rounded-xl text-xs"
                  />
                </div>

                {/* Submitter Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                      Your Name / Handle
                    </label>
                    <input
                      type="text"
                      placeholder="Cozy Visitor"
                      value={formRequesterName}
                      onChange={(e) => setFormRequesterName(e.target.value)}
                      className="site-input w-full py-2 px-3 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1">
                      Email (Optional, for notifications)
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={formRequesterEmail}
                      onChange={(e) => setFormRequesterEmail(e.target.value)}
                      className="site-input w-full py-2 px-3 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-tan-200 hover:bg-tan-300 text-ink-800 font-bold text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs shadow-cozy-sm transition-transform active:scale-95"
                  >
                    Submit Request ✨
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
