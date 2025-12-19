import FileUpload from "@/components/FileUpload";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900">
          Upload documents & ask questions
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
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
