// lib/db.js
import pkg from 'pg';
const { Pool } = pkg;

const opts = {};
if (process.env.PGSSLMODE === 'require' || (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=require'))) {
  opts.ssl = { rejectUnauthorized: false };
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...opts,
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
