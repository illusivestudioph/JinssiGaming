import { Heart, Gamepad2, BookOpen, Mail, Sparkles } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 pill bg-peach-100 text-peach-500 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-bold">About us</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-700 text-ink-900 mb-4 leading-tight">
          A cozy corner for
          <br className="sm:hidden" /> walkthrough lovers
        </h2>
        <p className="text-base sm:text-lg text-tan-500 max-w-2xl mx-auto leading-relaxed">
          Jinssi Gaming is a warm, wholesome space for players who love relaxing
          games and clear, visual walkthroughs. No ads, no clutter — just
          step-by-step guides with a planner feel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="cozy-card p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-peach-100 flex items-center justify-center mx-auto mb-3">
            <Gamepad2 className="w-6 h-6 text-peach-400" />
          </div>
          <h3 className="font-display text-base font-600 text-ink-900 mb-1">
            Curated Games
          </h3>
          <p className="text-sm text-tan-500 leading-relaxed">
            Handpicked cozy and wholesome titles you will love.
          </p>
        </div>

        <div className="cozy-card p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-earth-100 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-earth-500" />
          </div>
          <h3 className="font-display text-base font-600 text-ink-900 mb-1">
            Visual Guides
          </h3>
          <p className="text-sm text-tan-500 leading-relaxed">
            WikiHow-style walkthroughs with images for every step.
          </p>
        </div>

        <div className="cozy-card p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-sage-400" />
          </div>
          <h3 className="font-display text-base font-600 text-ink-900 mb-1">
            Made with Care
          </h3>
          <p className="text-sm text-tan-500 leading-relaxed">
            Built by a fellow cozy gamer, for the community.
          </p>
        </div>
      </div>

      <div className="cozy-card p-6 sm:p-8 bg-gradient-to-br from-cream-50 to-peach-50">
        <h3 className="font-display text-xl font-600 text-ink-900 mb-3">
          Get in touch
        </h3>
        <p className="text-base text-ink-700 leading-relaxed mb-5">
          Have a game suggestion, found a walkthrough error, or just want to
          say hi? We would love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mjhanesultancruz1514%40gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cozy bg-peach-400 text-cream-50 hover:bg-peach-500 hover:shadow-cozy-lg flex items-center gap-2 justify-center"
          >
            <Mail className="w-4 h-4" />
            <span>Email us</span>
          </a>
          <a
            href="https://www.threads.net/@jinssicruise"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cozy bg-cream-50 text-ink-900 border-2 border-cream-300 hover:border-peach-300 flex items-center gap-2 justify-center"
          >
            <span className="font-display font-700 text-sm">Threads</span>
            <span className="text-tan-400 text-sm">@jinssi cruise</span>
          </a>
          <a
            href="https://www.tiktok.com/@jinssicruise"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cozy bg-cream-50 text-ink-900 border-2 border-cream-300 hover:border-peach-300 flex items-center gap-2 justify-center"
          >
            <span className="font-display font-700 text-sm">TikTok</span>
            <span className="text-tan-400 text-sm">@jinssi cruise</span>
          </a>
        </div>
      </div>
    </div>
  );
}
