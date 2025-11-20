// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            TinyLink
          </Link>

          <nav>
            <Link href="/healthz" className="text-sm text-gray-600">
              Health
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">{children}</main>

      <footer className="max-w-4xl mx-auto p-4 text-sm text-gray-500">
        Built for assignment — TinyLink
      </footer>
    </div>
  );
}
