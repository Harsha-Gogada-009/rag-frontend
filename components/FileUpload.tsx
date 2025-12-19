import { useRef, useState } from "react";
import { BACKEND_URL } from "@/lib/api";

export default function FileUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const accepted = Array.from(fileList).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.endsWith(".py")
    );
    setFiles(accepted);
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(`✅ ${data.message}`);
    } catch (err) {
      setMessage("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload box */}
      <div
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.py"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <p className="text-lg font-medium text-gray-700">
          Click to upload files
        </p>
        <p className="text-sm text-gray-500 mt-1">
          PDF or Python (.py) files supported
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-gray-800">
            Selected files
          </h3>

          <ul className="text-sm text-gray-600 space-y-1">
            {files.map((file, idx) => (
              <li key={idx}>📄 {file.name}</li>
            ))}
          </ul>

          <button
            onClick={uploadFiles}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload files"}
          </button>

          {message && (
            <p className="text-sm text-gray-700">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
