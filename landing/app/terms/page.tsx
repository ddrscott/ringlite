export default function Terms() {
  return (
    <main className="min-h-screen">
      <article className="container mx-auto px-6 py-20 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: November 2024</p>

        <section className="space-y-6 text-gray-300">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">The Simple Version</h2>
            <p>
              RingLite is a simple tool to help you look better on video calls.
              Use it however you like. Don&apos;t do anything illegal with it.
              We&apos;re not responsible if something goes wrong.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">License</h2>
            <p className="mb-3">
              <strong>Free tier:</strong> You get 10 free uses of RingLite. After that,
              we&apos;ll gently remind you to purchase a Pro license.
            </p>
            <p>
              <strong>Pro license:</strong> A one-time payment of $7 gives you unlimited
              use of RingLite forever. The license is for personal use on your own devices.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Refunds</h2>
            <p>
              If RingLite doesn&apos;t work for you, email us within 30 days and we&apos;ll
              refund your purchase. No questions asked. We want you to be happy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">The Software</h2>
            <p>
              RingLite is provided &quot;as is&quot; without warranty. We do our best to make it
              work well, but we can&apos;t guarantee it will work perfectly on every system.
              We&apos;re not liable for any damages from using the software.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Updates</h2>
            <p>
              We may update these terms occasionally. If we make significant changes,
              we&apos;ll let you know. Continued use of RingLite means you accept the new terms.
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
