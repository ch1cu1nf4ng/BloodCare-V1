const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = process.env.DATA_DIR || '/data';
const DB_FILE = path.join(DATA_DIR, 'bloodcare.json');

function readDatabase() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return { profiles: [], history: [] };
  }
}
function writeDatabase(database) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temporaryFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(temporaryFile, JSON.stringify(database, null, 2));
  fs.renameSync(temporaryFile, DB_FILE);
}
function send(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  response.end(JSON.stringify(body));
}
function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => { body += chunk; if (body.length > 100000) request.destroy(); });
    request.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); } });
    request.on('error', reject);
  });
}
function validProfile(body) { return typeof body.name === 'string' && body.name.trim().length > 0 && body.name.trim().length <= 30; }
const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') { response.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }); return response.end(); }
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (!url.pathname.startsWith('/api/')) return send(response, 404, { error: 'Not found' });
  const database = readDatabase();
  try {
    if (request.method === 'GET' && url.pathname === '/api/profiles') return send(response, 200, database.profiles);
    if (request.method === 'GET' && url.pathname === '/api/history') {
      const profileId = url.searchParams.get('profileId');
      return send(response, 200, profileId ? database.history.filter((entry) => entry.profileId === profileId) : database.history);
    }
    if (request.method === 'POST' && url.pathname === '/api/profiles') {
      const body = await parseBody(request); const name = body.name.trim();
      if (!validProfile(body)) return send(response, 400, { error: 'A valid profile name is required.' });
      if (database.profiles.some((profile) => profile.name.toLowerCase() === name.toLowerCase())) return send(response, 409, { error: 'That profile name already exists.' });
      const profile = { id: crypto.randomUUID(), name, dob: body.dob || '' }; database.profiles.push(profile); writeDatabase(database); return send(response, 201, profile);
    }
    const profileMatch = url.pathname.match(/^\/api\/profiles\/([^/]+)$/);
    if (profileMatch && request.method === 'PUT') {
      const body = await parseBody(request); const profile = database.profiles.find((item) => item.id === profileMatch[1]); const name = body.name.trim();
      if (!profile) return send(response, 404, { error: 'Profile not found.' });
      if (!validProfile(body)) return send(response, 400, { error: 'A valid profile name is required.' });
      if (database.profiles.some((item) => item.id !== profile.id && item.name.toLowerCase() === name.toLowerCase())) return send(response, 409, { error: 'That profile name already exists.' });
      profile.name = name; profile.dob = body.dob || ''; database.history.forEach((entry) => { if (entry.profileId === profile.id) entry.profileName = name; }); writeDatabase(database); return send(response, 200, profile);
    }
    if (request.method === 'POST' && url.pathname === '/api/history') {
      const body = await parseBody(request); const profile = database.profiles.find((item) => item.id === body.profileId);
      if (!profile || !Number.isFinite(body.systolic) || !Number.isFinite(body.diastolic)) return send(response, 400, { error: 'A valid profile and measurement are required.' });
      const entry = { id: crypto.randomUUID(), profileId: profile.id, profileName: profile.name, systolic: body.systolic, diastolic: body.diastolic, pulse: body.pulse || '', category: body.category, timestamp: body.timestamp }; database.history.unshift(entry); writeDatabase(database); return send(response, 201, entry);
    }
    return send(response, 404, { error: 'Not found' });
  } catch (error) { return send(response, 500, { error: 'Server error', detail: error.message }); }
});
server.listen(PORT, () => console.log(`BloodCare API listening on port ${PORT}`));
