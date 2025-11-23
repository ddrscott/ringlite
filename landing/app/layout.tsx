import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'RingLite - The Ring Light That Lives in Your Laptop',
  description: 'A virtual ring light for video calls. Always with you, invisible to screen recordings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        {children}
        <Script
          defer
          data-domain="ringlit.app"
          src="https://plausible.ljs.app/js/script.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
