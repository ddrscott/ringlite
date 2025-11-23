export default function Privacy() {
  return (
    <main className="min-h-screen">
      <article className="container mx-auto px-6 py-20 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: November 2024</p>

        <section className="space-y-6 text-gray-300">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">The Short Version</h2>
            <p>
              We don&apos;t track you. We don&apos;t collect your data. We don&apos;t sell anything about you.
              RingLite runs entirely on your computer and doesn&apos;t phone home.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">What We Collect</h2>
            <p className="mb-3"><strong>From the app:</strong> Nothing. RingLite runs locally on your Mac.
            Your settings (ring size, position, color temperature) are stored locally in your browser&apos;s
            localStorage. We never see them.</p>
            <p><strong>From purchases:</strong> When you buy a Pro license, our payment processor (Stripe)
            collects your email address to deliver your license key. We don&apos;t store your payment details.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Analytics</h2>
            <p>
              We don&apos;t use any analytics or tracking on this website or in the app.
              No Google Analytics, no Facebook Pixel, no cookies tracking your behavior.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Third Parties</h2>
            <p>
              We use Stripe to process payments. Their privacy policy applies to payment transactions.
              That&apos;s the only third party involved.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Your Rights</h2>
            <p>
              Since we don&apos;t collect data, there&apos;s nothing to delete. If you purchased a license and
              want us to delete your email from our records, just ask.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Contact</h2>
            <p>
              Questions? Email us at <a href="mailto:support@ringlite.app" className="text-yellow-400 hover:text-yellow-300">support@ringlite.app</a>
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/" className="text-gray-400 hover:text-white">&larr; Back to RingLite</a>
        </div>
      </article>
    </main>
  )
}
