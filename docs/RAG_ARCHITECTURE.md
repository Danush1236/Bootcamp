# DMT RAG Chatbot Architecture

## Goal

Provide a production-ready chatbot for Department of Motor Traffic Sri Lanka guidance. Answers are grounded in official public DMT information and always return source links for verification.

## Runtime Flow

1. `components/Chatbot/ChatWidget.jsx` sends the user question to `POST /api/chat`.
2. `app/api/chat/route.ts` parses the HTTP request and delegates to the chat service.
3. `lib/dmt/services/chat-service.ts` validates input, applies rate limits and DMT-only guardrails, handles greetings/follow-ups, and calls retrieval.
4. `lib/dmt/services/retriever.ts` ranks official DMT knowledge chunks using phrase, intent, keyword, and cosine-style token scoring.
5. `lib/dmt/services/answer.ts` composes a grounded response from the highest ranked chunks. If `OPENAI_API_KEY` is configured, the server uses the OpenAI Responses API to synthesize a natural answer from retrieved context; otherwise it returns deterministic extractive guidance.
6. The chat widget renders the answer, official sources, and follow-up prompts.

## Knowledge Sources

The seeded knowledge base in `lib/dmt/data/knowledge.ts` was prepared from public DMT pages. The generated crawl output lives in `lib/dmt/data/generated-knowledge.ts`.

- https://dmtappointments.dmt.gov.lk/
- https://dmt.gov.lk/index.php?id=48&lang=en&option=com_content&view=article
- https://dmt.gov.lk/index.php?Itemid=165&id=49&lang=en&option=com_content&view=article
- https://dmt.gov.lk/index.php?catid=12&id=50&itemid=166&lang=en&option=com_content&view=article
- https://dmt.gov.lk/index.php?id=24&lang=en&option=com_content&view=article
- https://dmt.gov.lk/index.php?catid=11&id=23&itemid=147&lang=en&option=com_content&view=article
- https://dmt.gov.lk/index.php?id=13&lang=en&layout=blog&option=com_content&view=category
- https://dmt.gov.lk/index.php?Itemid=101&catid=2&id=58&lang=en&option=com_content&view=article
- https://dmt.gov.lk/index.php?Itemid=137&id=1&lang=en&option=com_contact&view=contact

## Production Notes

- No API key is exposed to the browser.
- The chatbot gives informational guidance and asks users to verify fees and current requirements on official DMT pages.
- `GET /api/chat` can be used as a lightweight health check.
- Run `npm run crawl:dmt` to refresh generated chunks from the configured official DMT pages.
- The curated seed knowledge remains committed as a reliable fallback if the live DMT site is unavailable during a crawl.
- The knowledge base is intentionally isolated from the UI so it can later be replaced by a database or external vector store without changing the frontend API contract.

## Operations

- Development: `npm run dev`
- Production build: `npm run build`
- Production start: `npm run start`
- Refresh public DMT index: `npm run crawl:dmt`
- Optional LLM mode: set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in the deployment environment.
