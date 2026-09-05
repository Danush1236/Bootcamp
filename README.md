# DMT Assist

A Next.js chatbot assistant for Department of Motor Traffic Sri Lanka services. The assistant uses retrieval-grounded answers from official public DMT pages and shows source links for user verification.

## Features

- Existing landing page and chat widget UI preserved.
- `POST /api/chat` backend for real chatbot answers.
- Curated DMT seed knowledge plus refreshable generated crawl index.
- DMT-only guardrails, greeting handling, contextual follow-ups, and basic rate limiting.
- Sinhala/Tamil/English language detection.
- Optional server-side OpenAI Responses API synthesis with deterministic fallback.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run lint
npm run build
npm run start
```

With the app running, verify the chatbot API:

```bash
npm run smoke:chat
```

## Refresh DMT Knowledge

```bash
npm run crawl:dmt
```

The crawler refreshes `lib/dmt/data/generated-knowledge.ts` from configured official DMT sources.

## Environment

Copy `.env.example` if you want LLM synthesis:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5
```

Without `OPENAI_API_KEY`, the chatbot still works using local retrieval and extractive answers.

## Project Structure

- `app/api/chat/route.ts` - HTTP route handler.
- `lib/dmt/services/chat-service.ts` - chat orchestration.
- `lib/dmt/services/retriever.ts` - retrieval scoring.
- `lib/dmt/services/answer.ts` - grounded answer composition.
- `lib/dmt/data/knowledge.ts` - curated seed knowledge.
- `lib/dmt/data/generated-knowledge.ts` - generated crawl index.
- `scripts/crawl-dmt.mjs` - DMT website crawler.
- `scripts/smoke-chat.mjs` - API smoke tests for a running local app.
- `docs/RAG_ARCHITECTURE.md` - architecture and operations notes.
