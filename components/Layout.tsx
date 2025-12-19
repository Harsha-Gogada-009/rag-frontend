import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md border-b border-indigo-500/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-md">
              📄 RAG System
            </h1>
            <p className="text-xs text-indigo-100">
              Document Question Answering
            </p>
          </div>

          <span className="text-sm text-white/90 font-medium">
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
      <footer className="bg-slate-800/50 backdrop-blur-md border-t border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-300">
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
