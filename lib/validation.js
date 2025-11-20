// lib/validation.js
const CODE_RE = /^[A-Za-z0-9]{6,8}$/;

function isValidCode(code) {
  return CODE_RE.test(code);
}

function normalizeUrl(input) {
  if (!input) return null;
  let url = String(input).trim();
  if (!/^[a-zA-Z]+:\/\//.test(url)) url = 'https://' + url;
  try {
    const u = new URL(url);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    return u.toString();
  } catch (e) {
    return null;
  }
}

function generateRandomCode(len = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export { isValidCode, normalizeUrl, generateRandomCode };
