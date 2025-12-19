import FileUpload from "@/components/FileUpload";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Upload documents & ask questions
        </h2>
        <p className="text-slate-200 mt-3 text-lg font-light">
          Upload PDF or Python files and chat with their content using
          Retrieval-Augmented Generation (RAG).
        </p>
      </section>

      {/* Upload Section */}
      <section>
        <FileUpload />
      </section>

      {/* Chat Section */}
      <section>
        <ChatBox />
      </section>
    </div>
  );
}
