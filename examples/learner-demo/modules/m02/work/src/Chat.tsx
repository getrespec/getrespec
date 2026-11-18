"use client";
import { useRef, useState } from "react";

type Status = "idle" | "answering" | "done" | "stopped" | "error";

export function Chat() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const controller = useRef<AbortController | null>(null);

  async function ask(question: string) {
    controller.current = new AbortController();
    setAnswer("");
    setStatus("answering");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [{ role: "user", content: question }] }),
        signal: controller.current.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setAnswer((a) => a + decoder.decode(value, { stream: true }));
      }
      setStatus("done");
    } catch (err) {
      setStatus((err as Error).name === "AbortError" ? "stopped" : "error");
    }
  }

  return (
    <section>
      <p aria-live="polite">{status === "answering" ? "Answering…" : status === "stopped" ? "Stopped" : status === "error" ? "Something went wrong" : ""}</p>
      <div>{answer}</div>
      {status === "answering" && <button onClick={() => controller.current?.abort()}>Stop</button>}
      {status === "error" && <button onClick={() => ask("retry")}>Try again</button>}
    </section>
  );
}
