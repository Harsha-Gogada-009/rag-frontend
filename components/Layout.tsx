import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              📄 RAG System
            </h1>
            <p className="text-xs text-gray-500">
              Document Question Answering
            </p>
          </div>

          <span className="text-sm text-gray-600">
            Powered by FAISS & LLMs
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <span>
            © {new Date().getFullYear()} RAG System
          </span>
          <span className="mt-2 sm:mt-0">
            Built with FastAPI · FAISS · Next.js
          </span>
        </div>
      </footer>
    </div>
  );
}
