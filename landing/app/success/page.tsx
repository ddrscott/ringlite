export default function Success() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-300 mb-6">
          Your license key has been sent to your email. Check your inbox (and spam folder).
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Open RingLite and enter your license key when prompted.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}
