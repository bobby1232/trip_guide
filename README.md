# Trip Guide

Telegram Mini App + Telegram bot for personal travel plans.

## Phuket 2026
Current trip: 13–27 November 2026.

## Structure
- `public/index.html` — Telegram Mini App UI
- `server.js` — web server for Railway
- `bot.js` — Telegram bot with WebApp button
- `package.json` — dependencies/scripts

## Railway
### Web service
Start command:
```bash
npm start
```
Healthcheck: `/health`

### Bot service
Start command:
```bash
npm run bot
```
Required environment variables:
- `BOT_TOKEN` — Telegram Bot token (set only in Railway dashboard)
- `MINIAPP_URL` — public HTTPS URL of the web service

The bot responds to `/start` and `/trip` with a button that opens the Mini App.
