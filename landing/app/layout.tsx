import type { Metadata } from 'next'
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
      <body className="text-white antialiased">{children}</body>
    </html>
  )
}
