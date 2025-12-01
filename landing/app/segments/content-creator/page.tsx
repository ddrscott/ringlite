import type { Metadata } from 'next'

const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '/RingLite_1.3.0_aarch64.dmg'

export const metadata: Metadata = {
  title: 'RingLite - Studio Lighting That Never Shows Up in Recordings',
  description: 'Your ring light keeps photobombing your content. Get invisible lighting for streams, tutorials, and videos.',
}

export default function ContentCreatorPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-yellow-400 font-medium mb-4 tracking-wide uppercase text-sm">For Content Creators</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Studio lighting that <span className="text-yellow-400">never shows up</span> in recordings
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Your ring light keeps photobombing your content.
          </p>
          <p className="text-gray-500 mb-8">
            Perfect lighting for streams, tutorials, and videos—invisible to OBS, Loom, and screen capture.
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
            src="/segments/content-creator-hero.png"
            alt="Before and after: No more ring light reflections in your recordings"
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
          <h2 className="text-2xl font-bold mb-8 text-center">The creator's lighting dilemma</h2>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Ring lights show up in screen recordings</p>
                <p className="text-sm mt-1">That bright circle in your glasses. The reflection in your monitor. Visible in every OBS capture.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Physical lights don't fit in your bag</p>
                <p className="text-sm mt-1">Conferences, collabs, travel vlogs—your lighting stays home while you look terrible on the road.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
              <span className="text-red-400 text-xl">✗</span>
              <div>
                <p className="text-white font-medium">Batteries die at the worst moment</p>
                <p className="text-sm mt-1">Mid-stream. Mid-recording. Mid-interview. Every time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ring-preview mx-auto mb-8" />
          <h2 className="text-3xl font-bold mb-4">The ring light OBS can't see</h2>
          <p className="text-gray-400 text-lg mb-8">
            RingLite uses native macOS screen capture exclusion APIs.
            Your face is lit. Your recordings are clean. Magic.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">👻</div>
              <h3 className="font-semibold mb-2">Invisible to Capture</h3>
              <p className="text-gray-400 text-sm">OBS, Loom, Zoom, screen recording—RingLite won't appear in any of them.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">🎒</div>
              <h3 className="font-semibold mb-2">Travels With You</h3>
              <p className="text-gray-400 text-sm">Consistent lighting at home, hotels, co-working spaces, or coffee shops.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">No Batteries</h3>
              <p className="text-gray-400 text-sm">Never charges. Never dies. Works as long as your laptop does.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Built for creators who...</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 flex items-start gap-4">
              <span className="text-yellow-400 text-xl">🎮</span>
              <div>
                <p className="font-medium">Stream on Twitch/YouTube</p>
                <p className="text-gray-400 text-sm mt-1">Face cam looks pro. No ring in the capture.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 flex items-start gap-4">
              <span className="text-yellow-400 text-xl">🎓</span>
              <div>
                <p className="font-medium">Create courses</p>
                <p className="text-gray-400 text-sm mt-1">Professional tutorials without a production budget.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 flex items-start gap-4">
              <span className="text-yellow-400 text-xl">🎙️</span>
              <div>
                <p className="font-medium">Record podcasts</p>
                <p className="text-gray-400 text-sm mt-1">Video podcasts with consistent lighting every episode.</p>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 flex items-start gap-4">
              <span className="text-yellow-400 text-xl">✈️</span>
              <div>
                <p className="font-medium">Travel for content</p>
                <p className="text-gray-400 text-sm mt-1">Same quality from your hotel room as your home studio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">Create anywhere in 3 steps</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">Download</h3>
            <p className="text-gray-400 text-sm">Free for macOS. Under 5MB. Native app, no Electron.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Position</h3>
            <p className="text-gray-400 text-sm">Drag the ring for your shot. Scroll to resize. Keyboard shortcuts for power users.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Record</h3>
            <p className="text-gray-400 text-sm">Hit record. RingLite lights your face but won't appear in the capture.</p>
          </div>
        </div>
      </section>

      {/* Tech Credibility */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-sm mb-4">HOW IT WORKS</p>
            <p className="text-lg text-gray-300">
              RingLite uses <code className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">NSWindow.setSharingType(NSWindowSharingNone)</code>—the same macOS API that hides system UI from screen recordings.
            </p>
            <p className="text-gray-500 text-sm mt-4">Native Rust + Tauri app. No Electron bloat. Under 5MB.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-yellow-500/20 to-transparent border-2 border-yellow-500/50 text-center">
            <h3 className="text-xl font-semibold mb-2">Pro License</h3>
            <div className="text-5xl font-bold mb-2">$7</div>
            <p className="text-gray-400 mb-6">One-time. Forever.</p>
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
            <p className="text-gray-500 text-sm mb-6">Cheaper than one stock video clip.</p>
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
        <h2 className="text-3xl font-bold mb-4">Create anywhere. Look consistent everywhere.</h2>
        <p className="text-gray-400 mb-8">Your next recording deserves better lighting.</p>
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
