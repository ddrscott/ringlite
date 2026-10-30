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

    // Every checkout on the Stripe account lands here, not just RingLite's.
    if (email && session.metadata?.product === 'ringlite') {
      const licenseKey = generateLicenseKey(email)

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'RingLite <noreply@ringlite.app>',
        to: email,
        subject: 'Your RingLite Pro License Key',
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="100%" style="max-width:520px;" cellpadding="0" cellspacing="0">
          <!-- Ring Light Visual -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <div style="width:80px;height:80px;border-radius:50%;border:6px solid #fbbf24;"></div>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#fbbf24;">RingLite Pro</h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0;color:#9ca3af;font-size:15px;">Thanks for your purchase!</p>
            </td>
          </tr>

          <!-- License Key Card -->
          <tr>
            <td style="background:rgba(255,255,255,0.05);border-radius:16px;padding:24px;border:1px solid rgba(255,255,255,0.1);">
              <p style="margin:0 0 12px;color:#d1d5db;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Your License Key</p>
              <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:16px;border:1px solid rgba(251,191,36,0.3);">
                <code style="color:#fbbf24;font-size:14px;font-family:'SF Mono',Monaco,Consolas,monospace;word-break:break-all;line-height:1.5;">${licenseKey}</code>
              </div>
            </td>
          </tr>

          <!-- Instructions -->
          <tr>
            <td style="padding-top:32px;">
              <h2 style="margin:0 0 16px;color:#ffffff;font-size:16px;font-weight:600;">How to Activate</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <span style="display:inline-block;width:20px;height:20px;background:rgba(251,191,36,0.2);color:#fbbf24;border-radius:50%;text-align:center;font-size:12px;line-height:20px;font-weight:600;">1</span>
                        </td>
                        <td style="color:#d1d5db;font-size:14px;">Open RingLite on your Mac</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <span style="display:inline-block;width:20px;height:20px;background:rgba(251,191,36,0.2);color:#fbbf24;border-radius:50%;text-align:center;font-size:12px;line-height:20px;font-weight:600;">2</span>
                        </td>
                        <td style="color:#d1d5db;font-size:14px;">Press "L" to open the License prompt</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;vertical-align:top;">
                          <span style="display:inline-block;width:20px;height:20px;background:rgba(251,191,36,0.2);color:#fbbf24;border-radius:50%;text-align:center;font-size:12px;line-height:20px;font-weight:600;">3</span>
                        </td>
                        <td style="color:#d1d5db;font-size:14px;">Enjoy unlimited use!</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <a href="https://ringlite.app/RingLite_1.3.0_aarch64.dmg" style="display:inline-block;background:#fbbf24;color:#000000;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;">Download for macOS</a>
              <p style="margin:8px 0 0;color:#6b7280;font-size:12px;">Apple Silicon (.dmg)</p>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:13px;">Need help? Just reply to this email.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:40px;text-align:center;border-top:1px solid rgba(255,255,255,0.1);margin-top:40px;">
              <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">
                RingLite by <a href="https://github.com/ddrscott" style="color:#d1d5db;text-decoration:none;">@ddrscott</a>
              </p>
              <p style="margin:8px 0 0;">
                <a href="https://ringlite.app" style="color:#fbbf24;font-size:13px;text-decoration:none;">ringlite.app</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      })
    }
  }

  return NextResponse.json({ received: true })
}
