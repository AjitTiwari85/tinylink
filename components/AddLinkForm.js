// components/AddLinkForm.js
import { useState } from 'react';

export default function AddLinkForm({ onCreated }) {
  const [target, setTarget] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code: code || undefined }),
      });
      if (res.status === 201) {
        const json = await res.json();
        setTarget('');
        setCode('');
        setMsg('Created ' + json.code);
        onCreated && onCreated();
      } else {
        const err = await res.json();
        setMsg('Error: ' + (err?.error || res.statusText));
      }
    } catch (err) {
      setMsg('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input required value={target} onChange={e=>setTarget(e.target.value)} placeholder="Target URL (e.g. example.com/path)" className="col-span-2 border p-2 rounded" />
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Optional code (6-8 chars)" className="border p-2 rounded" />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-60" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
        <div className="text-sm text-gray-600">{msg}</div>
      </div>
    </form>
  );
}
