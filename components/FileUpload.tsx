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
        className="border-2 border-dashed border-blue-400/50 rounded-2xl p-12 text-center cursor-pointer bg-gradient-to-br from-blue-500/10 via-slate-500/10 to-blue-600/10 backdrop-blur-sm hover:from-blue-500/20 hover:via-slate-500/20 hover:to-blue-600/20 hover:border-blue-400 transition-all duration-300 shadow-xl"
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

        <div className="text-5xl mb-4">📤</div>
        <p className="text-xl font-semibold text-white mb-2">
          Click to upload files
        </p>
        <p className="text-sm text-slate-300 mt-1">
          PDF or Python (.py) files supported
        </p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="bg-white/95 backdrop-blur-md border border-blue-200/30 rounded-2xl p-6 space-y-4 shadow-2xl">
          <h3 className="font-semibold text-slate-800 text-lg">
            Selected files
          </h3>

          <ul className="text-sm text-slate-700 space-y-2 bg-slate-50 rounded-lg p-4">
            {files.map((file, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-blue-600">📄</span>
                <span className="font-medium">{file.name}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={uploadFiles}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-slate-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {loading ? "Uploading..." : "Upload files"}
          </button>

          {message && (
            <p className="text-sm font-medium text-slate-700 bg-slate-100 rounded-lg p-3">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
