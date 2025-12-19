import FileUpload from "@/components/FileUpload";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Upload documents & ask questions
        </h2>
        <p className="text-gray-600 mt-1">
          Upload PDF or Python files and chat with their content using RAG.
        </p>
      </div>

      <FileUpload />

      <ChatBox />
    </div>
  );
}
