# Soulbuilders

A zero-cost community platform for builders.

## Tech Stack

| Layer      | Tool                              |
| ---------- | --------------------------------- |
| Frontend   | Next.js 16.2.3 (App Router) + TypeScript |
| Styling    | Tailwind CSS + Magic UI components |
| Auth & DB  | Supabase (free tier)              |
| Storage    | Supabase Storage (images only)    |
| Hosting    | Vercel (free)                     |

## Getting Started

```bash
# 1. Copy env template
cp .env.local.example .env.local

# 2. Fill in your Supabase credentials in .env.local

# 3. Install dependencies
npm install

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Loop Progress

| Loop | Feature               | Status   |
| ---- | --------------------- | -------- |
| 1    | Project scaffold      | ✅ Done  |
| 2    | Magic link login      | 🔜 Next  |
| 3    | Builder directory     | ⏳       |
| 4    | Profile pages         | ⏳       |
| 5    | Project cards         | ⏳       |

## Folder Structure

```
src/
├── app/
│   ├── auth/login/     # Magic link login page
│   ├── directory/      # Builder directory
│   ├── profile/        # Edit profile
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Navbar, Footer
│   └── ui/             # Button, Card (Magic UI style)
└── lib/
    ├── supabase/       # client.ts, server.ts
    └── utils.ts        # cn() helper
```
# soulhause-builders
# soulhause-builders
