// api/stripe-webhook.js
// Vercel Serverless Function — receives Stripe events
// Environment vars needed in Vercel:
//   STRIPE_SECRET_KEY       — sk_live_...
//   STRIPE_WEBHOOK_SECRET   — whsec_...
//   SUPABASE_URL            — https://kmnbtnfgeadvvkwsdyml.supabase.co
//   SUPABASE_SERVICE_KEY    — your service role key (NOT anon key)

import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Pack ID → Supabase pack UUID mapping
// Update these once you create products in Stripe dashboard
const STRIPE_PRICE_TO_PACK = {
  'price_1TJDRcPp3j8eGdItrxgbOnu9': 'a1b2c3d4-0001-0001-0001-000000000001', // N+ Pack
  'price_1TJDRkPp3j8eGdItADrm5zE6': 'a1b2c3d4-0002-0002-0002-000000000002', // Sec+ Pack
  'price_1TJDRqPp3j8eGdItxvJvCcCP': 'a1b2c3d4-0003-0003-0003-000000000003', // Bundle
}

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end',  ()    => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY  // service role — bypasses RLS to write entitlements
  )

  // ── 1. Verify Stripe signature ─────────────────────────────────────────────
  const rawBody = await getRawBody(req)
  const sig     = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  // ── 2. Handle checkout.session.completed ──────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Only process paid sessions
    if (session.payment_status !== 'paid') {
      return res.status(200).json({ received: true, skipped: 'not paid' })
    }

    const customerEmail = session.customer_details?.email
    const priceId       = session.metadata?.price_id || 
                          (await stripe.checkout.sessions.listLineItems(session.id))
                            .data[0]?.price?.id

    // Look up pack from price ID
    const packId = STRIPE_PRICE_TO_PACK[priceId]
    if (!packId) {
      console.error('Unknown price ID:', priceId)
      return res.status(200).json({ received: true, skipped: 'unknown price' })
    }

    // Find user by email in Supabase
    const { data: users } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', customerEmail)
      .limit(1)

    if (!users?.length) {
      // User doesn't have an account yet — store pending entitlement by email
      // They'll get access when they register with the same email
      console.log('No account found for:', customerEmail, '— storing pending entitlement')
      const { error } = await supabase.from('user_entitlements').insert({
        user_id: '00000000-0000-0000-0000-000000000000', // placeholder
        pack_id: packId,
        stripe_session_id:     session.id,
        stripe_payment_intent: session.payment_intent,
        amount_paid_gbp:       (session.amount_total / 100).toFixed(2),
        is_active:             false, // activate when they register
        purchased_at:          new Date().toISOString(),
        // Store email in metadata for later activation
      })
      if (error) console.error('Insert pending entitlement error:', error)
      return res.status(200).json({ received: true, pending: true })
    }

    const userId = users[0].id

    // Grant the entitlement
    const { error } = await supabase.from('user_entitlements').insert({
      user_id:               userId,
      pack_id:               packId,
      stripe_session_id:     session.id,
      stripe_payment_intent: session.payment_intent,
      amount_paid_gbp:       (session.amount_total / 100).toFixed(2),
      is_active:             true,
      purchased_at:          new Date().toISOString(),
    })

    if (error) {
      console.error('Failed to grant entitlement:', error)
      return res.status(500).json({ error: 'Failed to grant entitlement' })
    }

    console.log(`Entitlement granted: user=${userId} pack=${packId} session=${session.id}`)
  }

  // ── 3. Handle refunds / disputes ──────────────────────────────────────────
  if (event.type === 'charge.refunded' || event.type === 'charge.dispute.created') {
    const charge          = event.data.object
    const paymentIntent   = charge.payment_intent

    if (paymentIntent) {
      const { error } = await supabase
        .from('user_entitlements')
        .update({ is_active: false })
        .eq('stripe_payment_intent', paymentIntent)

      if (error) console.error('Failed to revoke entitlement:', error)
      else console.log('Entitlement revoked for payment_intent:', paymentIntent)
    }
  }

  res.status(200).json({ received: true })
}
