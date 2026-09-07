export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="September 7, 2026">
      <p>Jinssi Gaming respects your privacy. This policy explains what information we collect, why we collect it, and how you can contact us.</p>

      <h2>Information we collect</h2>
      <p>When you create an account or leave a note, we may collect your email address, display name, comments, reactions, and account activity. Newsletter subscribers provide an email address so we can send site updates.</p>
      <p>We also use local browser storage for walkthrough progress, preferences, and consent choices. This information stays in your browser unless you clear it.</p>

      <h2>How we use information</h2>
      <p>We use information to provide walkthroughs, save progress, operate comments and authentication, send requested newsletters, improve the site, prevent abuse, and respond to messages.</p>

      <h2>Cookies and advertising</h2>
      <p>Jinssi Gaming may use cookies or similar technologies for essential site features, analytics, and advertising. If Google AdSense is enabled, Google and its partners may use cookies to show and measure relevant ads. You can manage non-essential consent through the consent notice on this site and through your browser settings.</p>

      <h2>Third-party services</h2>
      <p>We use Supabase for authentication and data storage. We may use Google services for advertising or site measurement. These providers process information under their own privacy policies.</p>

      <h2>Data choices</h2>
      <p>You may request access to, correction of, or deletion of personal information associated with your account. You may unsubscribe from newsletters using the link in the email or contact us directly.</p>

      <h2>Contact</h2>
      <p>For privacy questions or requests, email <a href="mailto:mjhanesultancruz1514@gmail.com">mjhanesultancruz1514@gmail.com</a>.</p>
    </LegalPageLayout>
  );
}

function LegalPageLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="legal-page mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-3 text-sm font-extrabold uppercase tracking-wider text-peach-500">Jinssi Gaming</p>
      <h1 className="page-title mb-3 font-display text-4xl font-bold text-ink-900 sm:text-5xl">{title}</h1>
      <p className="mb-8 text-sm font-semibold text-tan-500">Last updated: {updated}</p>
      <div className="notepad-card legal-copy space-y-5 p-6 sm:p-10">{children}</div>
    </article>
  );
}
