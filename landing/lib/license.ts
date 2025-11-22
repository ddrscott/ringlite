import crypto from 'crypto'

// Generate a keypair once and store the private key in env, public key in app
// Run: node -e "const c=require('crypto');const k=c.generateKeyPairSync('ed25519');console.log('PRIVATE:',k.privateKey.export({type:'pkcs8',format:'pem'}));console.log('PUBLIC:',k.publicKey.export({type:'spki',format:'pem'}))"

const PRIVATE_KEY = process.env.LICENSE_PRIVATE_KEY!

export function generateLicenseKey(email: string): string {
  const timestamp = Date.now()
  const payload = JSON.stringify({ email, timestamp, product: 'ringlite-pro' })

  const privateKey = crypto.createPrivateKey(PRIVATE_KEY)
  const signature = crypto.sign(null, Buffer.from(payload), privateKey)

  const licenseData = {
    payload,
    signature: signature.toString('base64'),
  }

  // Encode as base64 for easy copy/paste
  return Buffer.from(JSON.stringify(licenseData)).toString('base64')
}

// Public key to embed in the app (safe to share)
export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA/zB2hOm8CL03USj+vw87fZYf/UOuVy45cQr/MZ6DWnw=
-----END PUBLIC KEY-----`
