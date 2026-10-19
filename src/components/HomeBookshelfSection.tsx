import type { Story } from '@/data/stories';
import { CHILDREN_OF_MU_STORY, INITIAL_STORIES, isRequestedStory } from '@/data/stories';
import { useSiteContent } from '@/context/SiteContentContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight } from '@/components/StreamlineIcons';
import {
  StreamlineBookDuo,
  StreamlineCoffeeDuo,
  StreamlineHeadphones,
  StreamlineStar,
} from '@/components/StreamlineIcons';

interface HomeBookshelfSectionProps {
  onSelectStory: (story: Story, chapterNumber?: number) => void;
  onNavigateToBookshelf: () => void;
}

export function HomeBookshelfSection({
  onSelectStory,
  onNavigateToBookshelf,
}: HomeBookshelfSectionProps) {
  const { stories } = useSiteContent();
  const { user, triggerAuthPrompt } = useAuth();

  // Top featured books from published stories
  const featuredStories: Story[] =
    stories && stories.length > 0 ? stories.slice(0, 3) : INITIAL_STORIES.slice(0, 3);

  const handleReadStory = (story: Story) => {
    if (isRequestedStory(story) && !user) {
      triggerAuthPrompt(
        `Sign in with your Jinssi account to read "${story.title}" and access all community-requested books!`
      );
      return;
    }
    onSelectStory(story, 1);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-2 border-tan-200/70">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="library-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-cozy-sm">
            <StreamlineHeadphones className="w-3.5 h-3.5 text-peach-600" />
            <span>Free Audiobook & Literature Sanctuary</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight text-balance">
            Audiobook & eBook Bookshelf
          </h2>
          <p className="text-sm text-ink-700 font-sans mt-1">
            Listen to and read complete unabridged editions with synchronized speech narration, cozy ambient fireplace and rain sounds.
          </p>
        </div>

        <button
          onClick={onNavigateToBookshelf}
          className="bookshelf-browse-btn inline-flex items-center gap-2 text-xs font-bold transition-all px-4 py-2 rounded-xl shadow-cozy-sm self-start sm:self-auto"
        >
          <StreamlineBookDuo className="w-4 h-4 text-peach-600" />
          <span>Browse 70,000+ Free eBooks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
        {featuredStories.map((story) => {
          const isPinned = Boolean(story.isPinned || story.id === CHILDREN_OF_MU_STORY.id);
          const isRequested = isRequestedStory(story);

          return (
            <article
              key={story.id}
              onClick={() => handleReadStory(story)}
              className={`notepad-card group cursor-pointer flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md h-full rounded-2xl ${
                isPinned ? 'ring-2 ring-[var(--theme-accent)] shadow-cozy-md' : ''
              }`}
            >
              <div>
                <div className="book-cover-container h-52 relative overflow-hidden bg-cream-200 flex items-center justify-center rounded-t-[1.1rem]">
                  {isPinned ? (
                    <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--theme-accent,theme(colors.peach.500))] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-cozy-sm">
                      <StreamlineStar className="w-3 h-3 text-white fill-white" />
                      <span>Pinned eBook #1</span>
                    </div>
                  ) : null}

                  <img
                    src={story.coverImage}
                    alt={story.coverAlt || `Cover for ${story.title}`}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                    {isRequested && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-peach-500 text-white shadow-cozy-xs flex items-center gap-1">
                        <span>🔒</span>
                        <span>Member Exclusive</span>
                      </span>
                    )}
                    <div className="public-domain-tag px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
                      {story.isPdfEbook ? `${story.pageCount || 290}-Page PDF` : `${story.totalChapters || story.chapters.length} Ch.`}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-tan-500 font-sans mb-2">
                    <span className="flex items-center gap-1.5 font-extrabold text-[var(--theme-accent,theme(colors.peach.600))]">
                      <StreamlineHeadphones className="w-3.5 h-3.5" />
                      {story.isPdfEbook ? 'Audiobook & PDF' : 'Audiobook & Reader'}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-ink-700">{story.genre}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-1 mb-1.5 leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-tan-500 font-bold mb-2">
                    By {story.author}
                    {isRequested && story.requestedBy && (
                      <span className="text-peach-700 font-semibold ml-2">• Requested by {story.requestedBy}</span>
                    )}
                  </p>

                  <p className="text-xs sm:text-sm text-ink-700 font-sans line-clamp-2 leading-relaxed mb-4">
                    {story.synopsis}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-tan-200/60 flex items-center justify-between text-xs font-bold text-peach-600">
                <span className="flex items-center gap-1.5 text-tan-500 font-normal">
                  <StreamlineCoffeeDuo className="w-3.5 h-3.5 text-peach-500" />
                  {isRequested ? '🌟 Member Request' : isPinned ? 'Featured Classic' : 'Jinssi Library'}
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span className={isPinned ? 'text-[var(--theme-accent)] font-extrabold' : ''}>
                    {isRequested && !user ? '🔒 Sign In to Read' : story.isPdfEbook ? '🎧 Read & Listen (PDF)' : '🎧 Read & Listen'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* "See More" bottom button on Home */}
      <div className="mt-8 text-center">
        <button
          onClick={onNavigateToBookshelf}
          className="bookshelf-browse-btn inline-flex items-center gap-2 text-xs font-bold transition-all px-6 py-3 rounded-xl shadow-cozy-sm hover:scale-105"
        >
          <span>See All 70,000+ Free eBooks</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
