// pages/code/[code].js
import { query } from '../../lib/db';
import Layout from '../../../components/Layout';

export async function getServerSideProps({ params }) {
  const code = params.code;

  const result = await query(
    'SELECT code, target, clicks, last_clicked, created_at FROM links WHERE code = $1',
    [code]
  );

  if (result.rows.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      link: result.rows[0],
    },
  };
}

export default function StatsPage({ link }) {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Stats for: {link.code}</h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <div><strong>Short Link:</strong> {process.env.NEXT_PUBLIC_BASE_URL}/{link.code}</div>
        <div><strong>Target URL:</strong> <a href={link.target} className="text-blue-600 underline">{link.target}</a></div>
        <div><strong>Total Clicks:</strong> {link.clicks}</div>
        <div><strong>Last Clicked:</strong> {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : "Never"}</div>
        <div><strong>Created At:</strong> {new Date(link.created_at).toLocaleString()}</div>
      </div>
    </Layout>
  );
}
