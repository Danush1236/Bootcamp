import { getClientKey, getDmtChatHealth, handleDmtChatRequest } from "@/lib/dmt/services/chat-service";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(getDmtChatHealth());
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const result = await handleDmtChatRequest(payload ?? {}, getClientKey(request));
  return Response.json(result.body, {
    status: result.status,
    headers: result.ok ? undefined : result.headers,
  });
}
