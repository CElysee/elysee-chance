# Chance & Elysee — Wedding Website

A luxury, cinematic wedding website for the wedding of Chance & Elysee.
**30 August 2026 · Jalia Hall, Rusororo, Kigali, Rwanda**

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## RSVP Google Sheet

RSVP submissions are saved to Google Sheets through the `/api/rsvps` server
route. Create a Google Cloud service account, enable the Google Sheets API,
then share the RSVP spreadsheet with the service account email as an editor.

Copy `.env.example` to `.env.local` and fill in:

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_RSVP_SHEET_NAME=RSVPs
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
RESEND_API_KEY=your_resend_api_key
RSVP_EMAIL_FROM="Chance & Elysee <rsvp@yourdomain.com>"
RSVP_EMAIL_REPLY_TO=reply-address@example.com
GMAIL_SMTP_USER=ccelyse1@gmail.com
GMAIL_SMTP_APP_PASSWORD=your_gmail_app_password
```

The first RSVP write creates the header row on the configured sheet. The admin
dashboard reads RSVPs from the same sheet.

Guests who provide an email address receive a confirmation email after their
RSVP is saved. To send from `ccelyse1@gmail.com`, enable 2-Step Verification on
that Gmail account, create an App Password, and set `GMAIL_SMTP_APP_PASSWORD`.
The Gmail sender is used first when configured. Resend remains available as a
fallback if `RESEND_API_KEY` and a verified `RSVP_EMAIL_FROM` are configured.

## Photos & branding

The couple's engagement photos live in `public/images/couple/` (hero, story,
and six gallery slots — some are centred landscape crops of the portrait
originals for collage variety). To swap any image, replace the file and keep
the filename. Black-and-white treatments are applied with CSS, so use colour
photos — they reveal their colour on hover.

The invitation logo (`public/images/brand/logo-gold.png`) appears in the
invitation section; the hero and footer use a CSS recreation of the same
lockup (Ziraje Chance & Confiance Elysee). The whole site uses the logo
palette sampled from the invitation: warm paper `#FDFAF3`, deep gold-brown
`#8A571A`, tan `#C08A4E`, peach `#F7D3A4`, and espresso `#221505`. Red, gold
and black appear in the dress-code moodboard as the guest attire theme.

## Routes

- `/` — one-page experience: crossfading photo hero, printed-invitation replica, three-chapter love story, parallax quote band, schedule timeline, dress code moodboard, gallery, venue, RSVP call-to-action, photo film strip
- `/rsvp` — RSVP form saved to Google Sheets
- `/gallery` — full gallery
- `/guestbook` — guest wishes (saved to localStorage for now)
- `/admin` — RSVP dashboard with stats, filters, and CSV export (no auth yet)

## Notes

- RSVP data is saved to Google Sheets. The form also keeps a browser backup
  after a successful save, and the admin dashboard falls back to that backup if
  the sheet cannot be reached.
- Guestbook data still lives in the browser's localStorage for now.
- Content (names, dates, venue, schedule, dress code) is centralised in
  `src/data/weddingData.ts`.

## Stack

Next.js (App Router) · TypeScript · CSS Modules · no UI libraries
