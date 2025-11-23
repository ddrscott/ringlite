const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '/RingLite_1.0.0_aarch64.dmg'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="ring-preview mx-auto mb-8" />
        <h1 className="text-5xl font-bold mb-4 pb-1 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
          RingLite
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          The ring light that lives in your laptop
        </p>
        <p className="text-gray-500 mb-8">
          Perfect lighting for video calls. Always with you. Invisible to screen recordings.
        </p>
        <a
          href={DOWNLOAD_URL}
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg transition"
        >
          Download Free (macOS)
        </a>
        <p className="text-gray-600 text-sm mt-2">10 free uses, then $7 for unlimited</p>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white/5">
            <div className="text-3xl mb-3">👻</div>
            <h3 className="font-semibold mb-2">Invisible to Recordings</h3>
            <p className="text-gray-400 text-sm">Screen share without showing the ring. Uses native macOS APIs.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5">
            <div className="text-3xl mb-3">🎛️</div>
            <h3 className="font-semibold mb-2">Fully Adjustable</h3>
            <p className="text-gray-400 text-sm">Drag anywhere. Resize with scroll wheel. Keyboard shortcuts.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/5">
            <div className="text-3xl mb-3">🪶</div>
            <h3 className="font-semibold mb-2">Lightweight</h3>
            <p className="text-gray-400 text-sm">Native app, under 5MB. No Electron bloat.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Light</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* Free Tier */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <div className="text-4xl font-bold mb-4">$0</div>
            <ul className="text-gray-400 text-sm space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> 10 free uses
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> All features included
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">⚠</span> Gentle reminder after 10 uses
              </li>
            </ul>
            <a
              href={DOWNLOAD_URL}
              className="block text-center py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"
            >
              Download
            </a>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-yellow-500/20 to-transparent border-2 border-yellow-500/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="text-4xl font-bold mb-4">$7</div>
            <ul className="text-gray-300 text-sm space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> Unlimited uses forever
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> No nag screens
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> Support indie development
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span> License key via email
              </li>
            </ul>
            <a
              href="/api/checkout"
              className="block text-center py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition"
            >
              Buy Now
            </a>
          </div>

          {/* Physical Ring Light */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 opacity-75">
            <h3 className="text-xl font-semibold mb-2">Physical Ring Light</h3>
            <div className="text-4xl font-bold mb-4">$50+</div>
            <ul className="text-gray-500 text-sm space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Requires charging (dies mid-call)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Takes up desk space
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> You&apos;ll lose it when traveling
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Visible in screen recordings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Harsh, non-adjustable lighting
              </li>
            </ul>
            <div className="text-center py-3 rounded-lg border border-white/10 text-gray-600 cursor-not-allowed">
              Search Amazon
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why Software Beats Hardware</h2>
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4"></th>
                <th className="py-3 px-4 text-yellow-400">RingLite</th>
                <th className="py-3 px-4 text-gray-500">Physical Light</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">Always with your laptop</td>
                <td className="py-3 px-4 text-center text-green-400">✓</td>
                <td className="py-3 px-4 text-center text-red-400">✗</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">No charging needed</td>
                <td className="py-3 px-4 text-center text-green-400">✓</td>
                <td className="py-3 px-4 text-center text-red-400">✗</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">Hidden from screen share</td>
                <td className="py-3 px-4 text-center text-green-400">✓</td>
                <td className="py-3 px-4 text-center text-red-400">✗</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">Infinitely adjustable</td>
                <td className="py-3 px-4 text-center text-green-400">✓</td>
                <td className="py-3 px-4 text-center text-red-400">✗</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4">Zero desk clutter</td>
                <td className="py-3 px-4 text-center text-green-400">✓</td>
                <td className="py-3 px-4 text-center text-red-400">✗</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Price</td>
                <td className="py-3 px-4 text-center text-yellow-400 font-semibold">$7</td>
                <td className="py-3 px-4 text-center text-gray-500">$50+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-gray-600 text-sm">
        <p>Made by <a href="https://github.com/ddrscott" className="text-gray-400 hover:text-white">@ddrscott</a></p>
        <p className="mt-2 space-x-4">
          <a href="https://github.com/ddrscott/ringlite" className="hover:text-white">GitHub</a>
          <span>·</span>
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <span>·</span>
          <a href="/terms" className="hover:text-white">Terms</a>
        </p>
      </footer>
    </main>
  )
}
