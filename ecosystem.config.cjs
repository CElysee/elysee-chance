const forwardedEnvNames = [
  "GOOGLE_SHEETS_SPREADSHEET_ID",
  "GOOGLE_SHEETS_RSVP_SHEET_NAME",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
  "RESEND_API_KEY",
  "RSVP_EMAIL_FROM",
  "RSVP_EMAIL_REPLY_TO",
  "GMAIL_SMTP_USER",
  "GMAIL_SMTP_APP_PASSWORD",
];

const runtimeEnv = Object.fromEntries(
  forwardedEnvNames
    .filter((name) => process.env[name])
    .map((name) => [name, process.env[name]])
);

module.exports = {
  apps: [
    {
      name: "elysee-chance",
      script: "server.js",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "0.0.0.0",
        ...runtimeEnv,
      },
    },
  ],
};
