import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import { generateLicenseKey } from '@/lib/license'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email

    if (email) {
      const licenseKey = generateLicenseKey(email)

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'RingLite <noreply@ljs.app>',
        to: email,
        subject: 'Your RingLite Pro License Key',
        html: `
          <h1>Thanks for purchasing RingLite Pro!</h1>
          <p>Here's your license key:</p>
          <pre style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:12px;word-break:break-all;">${licenseKey}</pre>
          <p><strong>How to activate:</strong></p>
          <ol>
            <li>Open RingLite</li>
            <li>When prompted, paste your license key</li>
            <li>Enjoy unlimited use!</li>
          </ol>
          <p>If you have any issues, reply to this email.</p>
        `,
      })
    }
  }

  return NextResponse.json({ received: true })
}
