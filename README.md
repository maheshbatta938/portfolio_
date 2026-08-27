# Mahesh Batta — Portfolio

A production-quality, full-stack developer portfolio.

```
React + TypeScript + Vite   (client/)
        |
        |  fetch("/api/chat")
        v
Node.js + Express + TypeScript   (server/)
        |
        v
Google Gemini API  +  portfolio.json (source of truth for the AI assistant)
```

## Stack

**Client** (`client/`)
- React 19 + TypeScript + Vite
- React Router
- Tailwind CSS v4 (design tokens for light/dark themes)
- Framer Motion (section reveals, header/nav transitions, AI panel)
- `marked` + `dompurify` for safe Markdown rendering in the AI assistant
- ESLint + Prettier

**Server** (`server/`)
- Node.js + Express + TypeScript
- Google Gemini (`@google/genai`) for the AI assistant, with a rule-based
  fallback if the API is unavailable
- `portfolio.json` as the single source of truth for the assistant's
  knowledge base (experience, projects, skills, education, contact, etc.)

## Running locally

**1. Backend** — needs a Gemini API key:

```bash
cd server
cp .env.example .env   # then fill in GEMINI_API_KEY
npm install
npm run dev             # http://localhost:3005
```

**2. Frontend** (in a second terminal):

```bash
cd client
npm install
npm run dev              # http://localhost:5173 (proxies /api to the server)
```

## Building for production

```bash
cd server && npm run build && npm start   # compiles to dist/, then runs it
cd client && npm run build                # outputs static assets to client/dist/
```

For a split deployment (client on a static host, server elsewhere), set
`VITE_API_BASE_URL` in the client's environment to the server's public URL.

## Project layout

```
client/src/
  components/   Header, Navigation, Hero, Experience, Projects, Skills,
                Coding, Education, Certifications, Contact, AIAssistant, ...
  context/      Theme, Toast, AIAssistant panel state
  data/         Typed content (profile, experience, projects, skills, ...)
  hooks/        useActiveSection, useTypingEffect, useCountUp, useChatHistory, ...
  services/     chatService.ts (talks to the Express API)
  layouts/      AppShell (floating header + centered app surface)
  pages/        Home.tsx

server/src/
  routes/, controllers/, services/, data/, utils/, config/
```
