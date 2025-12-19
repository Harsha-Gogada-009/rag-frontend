import { useState } from "react";
import { BACKEND_URL } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage }
    ]);

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Error fetching response"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-indigo-200/30 flex flex-col h-[520px]">
      {/* Header */}
      <div className="border-b border-indigo-200/30 px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <h2 className="font-bold text-slate-800 text-lg">
          💬 Ask Your Documents
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Responses are generated using uploaded files
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-indigo-50/30">
        {messages.length === 0 && !loading && (
          <p className="text-sm text-slate-400 text-center mt-10 font-medium">
            Ask a question to start chatting with your documents
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
              msg.role === "user"
                ? "ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "mr-auto bg-white border border-indigo-100 text-slate-800 shadow-sm"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-slate-500 italic font-medium flex items-center gap-2">
            <span className="animate-pulse">💭</span>
            Thinking…
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-indigo-200/30 p-4 flex gap-3 bg-white/80 backdrop-blur-sm">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your documents…"
          className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white/90"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                     text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
}
