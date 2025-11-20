// pages/api/links/index.js
import { query } from "../../../lib/db";
import {
  isValidCode,
  normalizeUrl,
  generateRandomCode,
} from "../../../lib/validation";

export default async function handler(req, res) {
if (req.method === "GET") {
  try {
    const r = await query(
      "SELECT code, target, clicks, last_clicked, created_at FROM links ORDER BY created_at DESC",
      []
    );
    return res.status(200).json({ links: r.rows }); // ✅ FIXED
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  }
}


  if (req.method === "POST") {
    const { target, code } = req.body || {};
    const normalized = normalizeUrl(target);
    if (!normalized)
      return res.status(400).json({ error: "Invalid target URL" });

    let finalCode = code ? String(code).trim() : generateRandomCode(6);
    if (!isValidCode(finalCode))
      return res
        .status(400)
        .json({ error: "Code must match [A-Za-z0-9]{6,8}" });

    try {
      const insert = await query(
        "INSERT INTO links (code, target) VALUES ($1, $2) RETURNING code, target, clicks, last_clicked, created_at",
        [finalCode, normalized]
      );
      return res.status(201).json(insert.rows[0]);
    } catch (err) {
      if (err.code === "23505")
        return res.status(409).json({ error: "Code already exists" });
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).end("Method Not Allowed");
}
