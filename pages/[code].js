// pages/[code].js
import { query } from '../lib/db';

export async function getServerSideProps({ params, res }) {
  const { code } = params;

  try {
    const r = await query('SELECT target FROM links WHERE code = $1', [code]);
    if (!r.rowCount) {
      res.statusCode = 404;
      return { notFound: true };
    }
    const target = r.rows[0].target;

    await query('UPDATE links SET clicks = clicks + 1, last_clicked = now() WHERE code = $1', [code]);

    return {
      redirect: {
        destination: target,
        permanent: false,
      },
    };
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return { props: {} };
  }
}

export default function RedirectPage() {
  return null;
}
