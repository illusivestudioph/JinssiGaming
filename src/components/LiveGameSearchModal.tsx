import { useState } from 'react';
import { Search, X, ExternalLink, Sparkles, Image as ImageIcon, BookOpen } from '@/components/StreamlineIcons';
import { searchSteamGamesLive, extractSteamGameLive } from '@/services/liveJournalFeed';

interface LiveGameSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveGameSearchModal({ isOpen, onClose }: LiveGameSearchModalProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSelectedGame(null);
    try {
      const items = await searchSteamGamesLive(query.trim());
      setResults(items || []);
    } catch (err) {
      console.error('Failed to search Steam games:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectGame = async (appId: number) => {
    setIsLoadingDetails(true);
    try {
      const details = await extractSteamGameLive(appId);
      setSelectedGame(details);
    } catch (err) {
      console.error('Failed to extract game details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-cream-100 border-2 border-tan-300 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-tan-200 flex items-center justify-between bg-cream-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-peach-500 text-white flex items-center justify-center shadow-cozy-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-ink-900 leading-tight">Live Steam Game Extractor</h2>
              <p className="text-xs text-tan-500">Search any PC game to extract live screenshots, description, and metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-tan-400 hover:text-ink-900 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 border-b border-tan-200 bg-cream-100/50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search games (e.g. Stardew Valley, Travellers Rest, Tiny Glade)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 border border-tan-300 text-sm text-ink-900 focus:outline-none focus:border-peach-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2.5 bg-peach-500 hover:bg-peach-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-cozy-xs shrink-0"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {selectedGame ? (
            /* Selected Game Extracted View in Blog Format */
            <div className="space-y-5 animate-fade-in">
              <button
                onClick={() => setSelectedGame(null)}
                className="text-xs font-bold text-peach-600 hover:underline flex items-center gap-1"
              >
                ← Back to search results
              </button>

              <div className="relative rounded-2xl overflow-hidden shadow-cozy-md bg-cream-200">
                <img
                  src={selectedGame.header_image}
                  alt={selectedGame.name}
                  className="w-full h-56 sm:h-72 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <a
                    href={`https://store.steampowered.com/app/${selectedGame.steam_appid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-900/90 backdrop-blur-sm text-cream-50 text-xs font-bold shadow-cozy-sm hover:bg-ink-800 transition-colors"
                  >
                    <ExternalLink size={12} className="text-peach-400" />
                    <span>View on Steam</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-ink-900 mb-1">{selectedGame.name}</h3>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-tan-500 mb-3">
                  {selectedGame.developers?.length > 0 && <span>Dev: {selectedGame.developers.join(', ')}</span>}
                  {selectedGame.release_date?.date && <span>• Released: {selectedGame.release_date.date}</span>}
                  {selectedGame.genres?.length > 0 && <span>• {selectedGame.genres.map((g: any) => g.description).join(', ')}</span>}
                </div>
                <p className="text-sm text-ink-800 leading-relaxed font-sans">{selectedGame.short_description}</p>
              </div>

              {/* Live Scraped Screenshots Gallery */}
              {selectedGame.screenshots?.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-tan-500 mb-2.5 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Authentic In-Game Screenshots ({selectedGame.screenshots.length})</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {selectedGame.screenshots.slice(0, 6).map((ss: any, idx: number) => (
                      <a
                        key={idx}
                        href={ss.path_full}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl overflow-hidden border border-tan-200 group block relative bg-cream-200 aspect-video shadow-cozy-xs"
                      >
                        <img
                          src={ss.path_thumbnail || ss.path_full}
                          alt="Screenshot"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results List */
            <div>
              {isLoadingDetails && (
                <div className="p-8 text-center text-sm font-bold text-tan-500">
                  Extracting live game data from Steam...
                </div>
              )}

              {!isLoadingDetails && results.length === 0 && !isSearching && (
                <div className="p-10 text-center text-tan-400 text-sm">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-tan-300" />
                  <p className="font-bold text-ink-700">Live Game Data Search</p>
                  <p className="text-xs text-tan-400 mt-1">Enter any game title to extract official assets and metadata.</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectGame(item.id)}
                    className="p-3 rounded-2xl bg-cream-50 border border-tan-200 hover:border-peach-400 hover:shadow-cozy-md transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={item.tiny_image}
                      alt={item.name}
                      className="w-16 h-10 object-cover rounded-lg bg-cream-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-ink-900 group-hover:text-peach-600 truncate transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs text-tan-500">
                        {item.price ? `$${(item.price.final / 100).toFixed(2)}` : 'Free / Available'}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-peach-600 shrink-0 group-hover:translate-x-1 transition-transform">
                      Extract →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
