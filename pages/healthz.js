// pages/healthz.js
export default function Healthz() {
  // This page returns JSON from getServerSideProps
  return null;
}

export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ ok: true, version: '1.0' }));
  return { props: {} };
}
