const BASE_URL = process.env.DMT_ASSIST_BASE_URL || "http://localhost:3000";

const checks = [
  {
    name: "health",
    run: async () => {
      const data = await request("/api/chat");
      assert(data.status === "ok", "health endpoint did not return ok");
      assert(data.knowledgeChunks > 0, "knowledge index is empty");
    },
  },
  {
    name: "appointment answer",
    run: async () => {
      const data = await chat("How do I book a DMT appointment?");
      assert(data.answer.includes("appointment portal"), "appointment answer is not focused");
      assert(data.sources.length === 1, "appointment should only cite the appointment portal");
    },
  },
  {
    name: "Jaffna office answer",
    run: async () => {
      const data = await chat("If I am from Jaffna, where is the office located?");
      assert(data.answer.includes("District Secretarial - Jaffna"), "Jaffna office answer is missing location");
    },
  },
  {
    name: "off-topic guardrail",
    run: async () => {
      const data = await chat("Tell me a joke");
      assert(data.retrieved.length === 0, "off-topic question should not retrieve DMT chunks");
      assert(data.confidence === "low", "off-topic question should have low confidence");
    },
  },
];

for (const check of checks) {
  await check.run();
  console.log(`ok - ${check.name}`);
}

async function chat(message) {
  return request("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message }),
  });
}

async function request(path, init) {
  const response = await fetch(`${BASE_URL}${path}`, init);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${path} failed with HTTP ${response.status}: ${JSON.stringify(data)}`);
  }

  return data;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
