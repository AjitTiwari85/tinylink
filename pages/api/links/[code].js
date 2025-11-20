// pages/api/links/[code].js
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method === 'GET') {
    try {
      const r = await query('SELECT code, target, clicks, last_clicked, created_at FROM links WHERE code = $1', [code]);
      if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(r.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const r = await query('DELETE FROM links WHERE code = $1 RETURNING code', [code]);
      if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
      return res.status(204).end();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  res.setHeader('Allow', 'GET, DELETE');
  return res.status(405).end('Method Not Allowed');
}
