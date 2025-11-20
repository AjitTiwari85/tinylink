// components/LinksTable.js
import Link from 'next/link';

export default function LinksTable({ links = [], onDeleted }) {
  async function handleDelete(code) {
    if (!confirm('Delete ' + code + '?')) return;
    const res = await fetch(`/api/links/${code}`, { method: 'DELETE' });
    if (res.status === 204) onDeleted && onDeleted();
    else alert('Delete failed');
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="p-2">Short</th>
            <th className="p-2">Target</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Last clicked</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No links yet.
              </td>
            </tr>
          )}

          {links.map(l => (
            <tr key={l.code} className="border-t">
              <td className="p-2">
                <Link
                  href={`/code/${l.code}`}
                  className="text-blue-600"
                >
                  {l.code}
                </Link>
              </td>

              <td className="p-2 max-w-[36ch]">
                <a
                  href={l.target}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden truncate"
                >
                  {l.target}
                </a>
              </td>

              <td className="p-2">{l.clicks}</td>

              <td className="p-2">
                {l.last_clicked
                  ? new Date(l.last_clicked).toLocaleString()
                  : 'Never'}
              </td>

              <td className="p-2">
                <button
                  className="px-2 py-1 border rounded mr-2"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/${l.code}`
                    )
                  }
                >
                  Copy
                </button>

                <button
                  className="px-2 py-1 border rounded text-red-600"
                  onClick={() => handleDelete(l.code)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
