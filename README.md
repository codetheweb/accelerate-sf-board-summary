This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Copy `.env.example` to `.env.local`.

```bash
cd python-legistar-scraper
poetry install
cd ..

npm i
docker compose up -d
npm run db:reset
npm run scrape:events
```
