import type { Metadata } from 'next'

const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '/RingLite_1.3.0_aarch64.dmg'

export const metadata: Metadata = {
  title: 'RingLite - Stop Looking Tired on Zoom',
  description: "You're not exhausted. Your lighting is just terrible. Get perfect lighting without the desk clutter.",
}

export default function RemoteWorkerPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 font-medium mb-4 tracking-wide uppercase text-sm">For Remote Workers</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Stop looking <span className="text-yellow-400">tired</span> on Zoom
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            You're not exhausted. Your lighting is just terrible.
          </p>
          <p className="text-gray-500 mb-8">
            Bad lighting makes everyone look washed out. Fix it without buying another gadget.
          </p>
          <a
            href={DOWNLOAD_URL}
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg transition text-lg"
          >
            Download Free (macOS)
          </a>
          <p className="text-gray-600 text-sm mt-3">10 free uses, then $7 for unlimited</p>
        </div>
        <figure className="mt-12 max-w-4xl mx-auto">
          <img
            src="/segments/remote-worker-hero.png"
            alt="Before and after: Same home office, looking refreshed instead of exhausted"
            className="rounded-xl shadow-2xl"
          />
          <figcaption className="text-center text-gray-600 text-xs mt-3">
            Illustrative image. <a href="/terms" className="underline hover:text-gray-400">Results may vary.</a>
          </figcaption>
        </figure>
      </section>

      {/* Problem Agitation */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">You've tried everything</h2>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Natural light is inconsistent</p>
                <p className="text-sm mt-1">Great at 10am, terrible by 3pm. And forget about it on cloudy days.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Physical ring lights clutter your desk</p>
                <p className="text-sm mt-1">Tripods, stands, cables. And they always die mid-call.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">You're tired of seeing yourself look tired</p>
                <p className="text-sm mt-1">The self-view box is a constant reminder. Shadows under your eyes. Washed out skin. Every. Single. Call.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ring-preview mx-auto mb-8" />
          <h2 className="text-3xl font-bold mb-4">Perfect lighting. Zero hardware.</h2>
          <p className="text-gray-400 text-lg mb-8">
            RingLite is a virtual ring light that lives in your laptop.
            Soft, even lighting on every call—no desk clutter, no charging, no hassle.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">🧹</div>
              <h3 className="font-semibold mb-2">No Desk Clutter</h3>
              <p className="text-gray-400 text-sm">No tripods. No stands. No cables. Just your laptop.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">🔋</div>
              <h3 className="font-semibold mb-2">Never Dies</h3>
              <p className="text-gray-400 text-sm">No batteries to charge. Works as long as your laptop does.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">👻</div>
              <h3 className="font-semibold mb-2">Invisible to Recordings</h3>
              <p className="text-gray-400 text-sm">Screen share without showing the ring. Native macOS magic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Concept */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Same you. Better light.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-red-500/20">
              <p className="text-red-400 text-sm font-medium mb-3">Without RingLite</p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Harsh shadows under eyes</li>
                <li>• Washed out, pale skin</li>
                <li>• Looks tired even when you're not</li>
                <li>• Uneven, unflattering lighting</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-green-500/20">
              <p className="text-green-400 text-sm font-medium mb-3">With RingLite</p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Soft, even illumination</li>
                <li>• Natural, healthy skin tone</li>
                <li>• Alert and professional appearance</li>
                <li>• Consistent on every call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Set it and forget it</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">Download</h3>
            <p className="text-gray-400 text-sm">Free for macOS. Tiny app, installs in seconds.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Position once</h3>
            <p className="text-gray-400 text-sm">Drag the ring around your camera. It remembers your preference.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Forget about it</h3>
            <p className="text-gray-400 text-sm">Perfect lighting on every call. No daily setup.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-yellow-500/20 to-transparent border-2 border-yellow-500/50 text-center">
            <h3 className="text-xl font-semibold mb-2">Pro License</h3>
            <div className="text-5xl font-bold mb-2">$7</div>
            <p className="text-gray-400 mb-6">One-time payment. Use forever.</p>
            <ul className="text-gray-300 text-sm space-y-2 mb-8 text-left max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Unlimited uses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> No subscriptions ever
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> License key via email
              </li>
            </ul>
            <p className="text-gray-500 text-sm mb-6">Less than your daily coffee habit.</p>
            <a
              href="/api/checkout"
              className="block w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition"
            >
              Buy Now
            </a>
            <p className="text-gray-600 text-xs mt-4">Or try free first — 10 uses included</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Look as good as you feel</h2>
        <p className="text-gray-400 mb-8">Your next Zoom call doesn't have to be a horror show.</p>
        <a
          href={DOWNLOAD_URL}
          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg transition text-lg"
        >
          Download Free (macOS)
        </a>
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
