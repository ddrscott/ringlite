import type { Metadata } from 'next'

const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '/RingLite_1.3.0_aarch64.dmg'

export const metadata: Metadata = {
  title: 'RingLite - Look Like a Pro in Any Hotel Room',
  description: 'Bad hotel lighting is costing you deals. Get studio-quality lighting that travels with your laptop.',
}

export default function RoadWarriorPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 font-medium mb-4 tracking-wide uppercase text-sm">For Sales Professionals</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Bad hotel lighting is <span className="text-yellow-400">costing you deals</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            You're closing deals on video. But you look like you're calling from a cave.
          </p>
          <p className="text-gray-500 mb-8">
            First impressions happen in 7 seconds. Don't let terrible lighting waste yours.
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
            src="/segments/road-warrior-hero.png"
            alt="Before and after: Same hotel room, dramatically better lighting with RingLite"
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
          <h2 className="text-2xl font-bold mb-8 text-center">The road warrior's lighting problem</h2>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Hotel room lighting is universally terrible</p>
                <p className="text-sm mt-1">Overhead lights cast harsh shadows. Desk lamps blind you. Window light changes every hour.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">You can't pack a ring light in your carry-on</p>
                <p className="text-sm mt-1">And even if you could, you don't have time to set it up between calls.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Prospects judge you before you speak</p>
                <p className="text-sm mt-1">Dark, shadowy video = unprepared, unprofessional. Fair? No. Reality? Yes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ring-preview mx-auto mb-8" />
          <h2 className="text-3xl font-bold mb-4">Studio lighting that lives in your laptop</h2>
          <p className="text-gray-400 text-lg mb-8">
            RingLite is a virtual ring light. Open your laptop, turn it on, look professional.
            No gear. No charging. No setup.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">🧳</div>
              <h3 className="font-semibold mb-2">Always With You</h3>
              <p className="text-gray-400 text-sm">Installed on your laptop. Works anywhere you have your computer.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">👻</div>
              <h3 className="font-semibold mb-2">Invisible to Recordings</h3>
              <p className="text-gray-400 text-sm">Screen share your deck without showing the ring. Native macOS APIs.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Zero Setup</h3>
              <p className="text-gray-400 text-sm">Drag to position. Scroll to resize. That's it. Takes 2 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20">
            <p className="text-4xl font-bold text-yellow-400 mb-2">127%</p>
            <p className="text-gray-300">more likely to close when video is used in sales</p>
            <p className="text-gray-500 text-sm mt-4">Don't let bad lighting undo your video advantage.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Look pro in 3 steps</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">Download</h3>
            <p className="text-gray-400 text-sm">Free for macOS. Under 5MB. Installs in seconds.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Position</h3>
            <p className="text-gray-400 text-sm">Drag the ring around your camera. Resize with scroll wheel.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Close deals</h3>
            <p className="text-gray-400 text-sm">Look like a pro from any hotel room, coffee shop, or airport lounge.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-yellow-500/20 to-transparent border-2 border-yellow-500/50 text-center">
            <h3 className="text-xl font-semibold mb-2">Pro License</h3>
            <div className="text-5xl font-bold mb-2">$7</div>
            <p className="text-gray-400 mb-6">One-time payment. Unlimited uses forever.</p>
            <ul className="text-gray-300 text-sm space-y-2 mb-8 text-left max-w-xs mx-auto">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Unlimited uses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> No subscriptions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> License key via email
              </li>
            </ul>
            <p className="text-gray-500 text-sm mb-6">Less than a coffee. More than a first impression.</p>
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
        <h2 className="text-3xl font-bold mb-4">Your next call is in a hotel room somewhere</h2>
        <p className="text-gray-400 mb-8">Make sure you don't look like it.</p>
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
