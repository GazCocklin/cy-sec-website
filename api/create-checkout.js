// api/create-checkout.js
// Creates a Stripe Checkout session for a PBQ pack purchase
// POST { priceId, userEmail, packId }

import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS — allow FortifyLearn to call this
  res.setHeader('Access-Control-Allow-Origin', 'https://fortifylearn.co.uk')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { priceId, userEmail, packId, packName } = req.body

  if (!priceId) {
    return res.status(400).json({ error: 'priceId required' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: userEmail || undefined,
      success_url: `https://fortifylearn.co.uk?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `https://cy-sec.co.uk/#catalogue`,
      metadata: {
        price_id: priceId,
        pack_id:  packId,
      },
      payment_intent_data: {
        metadata: {
          pack_name: packName || 'PBQ Pack',
          pack_id:   packId,
        },
      },
      // Collect billing address for UK VAT compliance
      billing_address_collection: 'auto',
      // Allow promo codes
      allow_promotion_codes: true,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    res.status(500).json({ error: err.message })
  }
}
