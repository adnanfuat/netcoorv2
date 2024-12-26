import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import clerk_useroperations from '@/modules/clerk/clerk_useroperations';

export async function POST(req: Request) {

  const SIGNING_SECRET = process.env.WEBHOOK_SECRET;

  console.log("aaaasss111aaaaaaaaa", SIGNING_SECRET);

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data
  const eventType = evt.type
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`)

  if (eventType=="user.created" ) //eventType=="session.created" || 
  {
        // console.log('Webhook payload:', body);
        // Yeni kullanıcı oluşturacak. Ama varsa zaten oluşturmuyor..
        clerk_useroperations({body});
  }

  return new Response('Webhook received', { status: 200 })
}



// Payload'dan gelen veri aşağıda::









// {
//   "data": {
//     "backup_code_enabled": false,
//     "banned": false,
//     "create_organization_enabled": true,
//     "created_at": 1735197879229,
//     "delete_self_enabled": false,
//     "email_addresses": [
//       {
//         "created_at": 1735197878124,
//         "email_address": "yigitruzgaruzun@gmail.com",
//         "id": "idn_2qkDraVXey36nljicwkSf3f2hUK",
//         "linked_to": [
//           {
//             "id": "idn_2qkDrWzMKZIixJRuRvPQyJz0Tzh",
//             "type": "oauth_google"
//           }
//         ],
//         "matches_sso_connection": false,
//         "object": "email_address",
//         "reserved": false,
//         "updated_at": 1735197879266,
//         "verification": {
//           "attempts": null,
//           "expire_at": null,
//           "status": "verified",
//           "strategy": "from_oauth_google"
//         }
//       }
//     ],
//     "enterprise_accounts": [],
//     "external_accounts": [
//       {
//         "approved_scopes": "email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile",
//         "created_at": 1735197878106,
//         "email_address": "yigitruzgaruzun@gmail.com",
//         "family_name": "Uzun",
//         "given_name": "Yiğit Rüzgar",
//         "google_id": "103143641397390820879",
//         "id": "idn_2qkDrWzMKZIixJRuRvPQyJz0Tzh",
//         "label": null,
//         "object": "google_account",
//         "picture": "https://lh3.googleusercontent.com/a/ACg8ocIQDRtYBpEX_lmq84KAidG_UvlKFZ5U7-Ydu9HcMU39znG5IbEUFw=s1000-c",
//         "public_metadata": {},
//         "updated_at": 1735197878106,
//         "username": null,
//         "verification": {
//           "attempts": null,
//           "expire_at": 1735198474318,
//           "status": "verified",
//           "strategy": "oauth_google"
//         }
//       }
//     ],
//     "external_id": null,
//     "first_name": "Yiğit Rüzgar",
//     "has_image": true,
//     "id": "user_2qkDria3dnUokXsFg1lnevWpZIq",
//     "image_url": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycWtEcmhiQmR6VEVtV243cjlyR2FNTVdneXoifQ",
//     "last_active_at": 1735197879226,
//     "last_name": "Uzun",
//     "last_sign_in_at": null,
//     "legal_accepted_at": null,
//     "locked": false,
//     "lockout_expires_in_seconds": null,
//     "mfa_disabled_at": null,
//     "mfa_enabled_at": null,
//     "object": "user",
//     "passkeys": [],
//     "password_enabled": false,
//     "phone_numbers": [],
//     "primary_email_address_id": "idn_2qkDraVXey36nljicwkSf3f2hUK",
//     "primary_phone_number_id": null,
//     "primary_web3_wallet_id": null,
//     "private_metadata": {},
//     "profile_image_url": "https://images.clerk.dev/oauth_google/img_2qkDrhbBdzTEmWn7r9rGaMMWgyz",
//     "public_metadata": {},
//     "saml_accounts": [],
//     "totp_enabled": false,
//     "two_factor_enabled": false,
//     "unsafe_metadata": {},
//     "updated_at": 1735197879285,
//     "username": null,
//     "verification_attempts_remaining": 100,
//     "web3_wallets": []
//   },
//   "event_attributes": {
//     "http_request": {
//       "client_ip": "95.70.216.159",
//       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
//     }
//   },
//   "object": "event",
//   "timestamp": 1735197879343,
//   "type": "user.created"
// }