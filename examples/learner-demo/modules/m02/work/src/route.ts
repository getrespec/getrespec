import OpenAI from "openai";

const client = new OpenAI(); // key and base URL come from the server environment

export async function POST(req: Request) {
  const { messages } = await req.json();
  const stream = await client.chat.completions.create({
    model: process.env.RESPEC_MODEL ?? "gpt-6-luna",
    messages,
    stream: true,
    stream_options: { include_usage: true },
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      stream.controller.abort();
    },
  });

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
