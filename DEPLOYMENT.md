# Deployment

This app runs as a Next.js Node server behind Nginx Proxy Manager.

## Server prerequisites

Install Node.js 22 and PM2 on the server:

```bash
npm install -g pm2
mkdir -p /var/www/elysee-chance
```

Create a deploy user that can write to `/var/www/elysee-chance`, or change the
`APP_DIR` GitHub secret to a directory your SSH user owns.

## GitHub Actions secrets

Add these repository secrets in GitHub:

```bash
SSH_HOST=206.189.211.25
SSH_USER=your_ssh_user
SSH_PRIVATE_KEY=your_private_deploy_key
SSH_PORT=22
APP_DIR=/var/www/elysee-chance
GOOGLE_SHEETS_SPREADSHEET_ID=...
GOOGLE_SHEETS_RSVP_SHEET_NAME=RSVPs
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
RESEND_API_KEY=...
RSVP_EMAIL_FROM=Chance & Elysee <rsvp@4mine.rw>
RSVP_EMAIL_REPLY_TO=...
GMAIL_SMTP_USER=...
GMAIL_SMTP_APP_PASSWORD=...
```

The deploy runs on every push to `main`, or manually from the workflow page.

## Nginx Proxy Manager

Add a Proxy Host for the app:

```text
Domain Names: 4mine.rw
Scheme: http
Forward Hostname / IP: 127.0.0.1
Forward Port: 3000
Access List: Publicly Accessible
Block Common Exploits: enabled
Websockets Support: enabled
```

In the SSL tab:

```text
SSL Certificate: Request a new SSL Certificate
Force SSL: enabled
HTTP/2 Support: enabled
HSTS: optional, enable only after HTTPS works
Email: your Let's Encrypt email
Agree to Let's Encrypt Terms: enabled
```

Make sure the DNS `A` record for `4mine.rw` points to `206.189.211.25`.
