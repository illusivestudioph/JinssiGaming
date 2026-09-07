export function ContactPage() {
  return (
    <article className="legal-page mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-3 text-sm font-extrabold uppercase tracking-wider text-peach-500">Jinssi Gaming</p>
      <h1 className="page-title mb-3 font-display text-4xl font-bold text-ink-900 sm:text-5xl">Contact Us</h1>
      <p className="mb-8 text-base font-semibold leading-relaxed text-tan-600">Have a game suggestion, found an error, or have a privacy question? We would love to hear from you.</p>
      <div className="notepad-card space-y-6 p-6 sm:p-10">
        <div>
          <h2 className="mb-2 font-display text-2xl font-bold text-ink-900">Email</h2>
          <p className="text-ink-700">For support, privacy requests, corrections, and business inquiries:</p>
          <a className="mt-3 inline-block font-bold text-peach-600 hover:text-peach-500" href="mailto:mjhanesultancruz1514@gmail.com">mjhanesultancruz1514@gmail.com</a>
        </div>
        <div>
          <h2 className="mb-2 font-display text-2xl font-bold text-ink-900">What to include</h2>
          <p className="text-ink-700">Please include the game title, the page or step involved, and enough detail for us to reproduce the issue. Do not send passwords or payment information.</p>
        </div>
      </div>
    </article>
  );
}
