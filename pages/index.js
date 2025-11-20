import useSWR from 'swr';
import { useState } from 'react';
import Layout from '../components/Layout';
import AddLinkForm from '../components/AddLinkForm';
import LinksTable from '../components/LinksTable';

const fetcher = url => fetch(url).then(r => r.json());

export default function Dashboard() {
  const { data, mutate } = useSWR('/api/links', fetcher);

  const links = data?.links || []; // ✅ FIXED

  const [q, setQ] = useState('');

  const filtered = links.filter(l => {
    const qq = q.toLowerCase();
    return (
      !q ||
      l.code.toLowerCase().includes(qq) ||
      l.target.toLowerCase().includes(qq)
    );
  });

  return (
    <Layout>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">TinyLink — Dashboard</h1>
        <p className="text-sm text-gray-600">Create short links, view stats, and manage them.</p>
      </header>

      <AddLinkForm onCreated={() => mutate()} />

      <div className="mb-4 flex items-center gap-2">
        <input
          placeholder="Search by code or URL"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      <LinksTable links={filtered} onDeleted={() => mutate()} />
    </Layout>
  );
}
