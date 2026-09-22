import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "data", "makeup_artist.db");

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_date TEXT,
  event_type TEXT,
  location TEXT,
  style TEXT,
  people INTEGER,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover TEXT,
  author TEXT DEFAULT 'Aurelia',
  read_time TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me-now";
const adminTokens = new Set();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "makeup-artist-api", database: "sqlite" });
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid admin password." });
  }
  const token = crypto.randomBytes(32).toString("hex");
  adminTokens.add(token);
  res.json({ token });
});

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token || !adminTokens.has(token)) {
    return res.status(401).json({ error: "Admin authentication required." });
  }
  next();
}

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const token = req.headers.authorization.replace(/^Bearer\s+/i, "");
  adminTokens.delete(token);
  res.json({ message: "Logged out." });
});

app.get("/api/bookings", requireAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all();
  res.json(rows);
});

app.post("/api/bookings", (req, res) => {
  const { name, phone, email, date, eventType, location, style, people, message } = req.body;
  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name and phone are required." });
  }

  const result = db.prepare(`
    INSERT INTO bookings
      (name, phone, email, event_date, event_type, location, style, people, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name.trim(), phone.trim(), email?.trim() || null, date || null,
    eventType || null, location?.trim() || null, style || null,
    people ? Number(people) : null, message?.trim() || null
  );

  res.status(201).json({ id: result.lastInsertRowid, message: "Booking request received." });
});

app.patch("/api/bookings/:id", requireAdmin, (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status." });
  const result = db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(status, req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Booking not found." });
  res.json({ message: "Booking updated." });
});

app.get("/api/contacts", requireAdmin, (_req, res) => {
  res.json(db.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all());
});

app.post("/api/contacts", (req, res) => {
  const { name, email, message } = req.body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const result = db.prepare(`
    INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)
  `).run(name.trim(), email.trim(), message.trim());

  res.status(201).json({ id: result.lastInsertRowid, message: "Message received." });
});

app.patch("/api/contacts/:id", requireAdmin, (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "read", "replied", "archived"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status." });
  const result = db.prepare("UPDATE contacts SET status = ? WHERE id = ?").run(status, req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Message not found." });
  res.json({ message: "Contact updated." });
});

app.get("/api/admin/blog", requireAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM blog_posts ORDER BY created_at DESC").all();
  res.json(rows.map(r => ({ ...r, date: r.created_at, readTime: r.read_time, content: JSON.parse(r.content) })));
});

app.get("/api/blog", (_req, res) => {
  const rows = db.prepare(`
    SELECT id, slug, title, category, excerpt, content, cover, author, read_time, published, created_at, updated_at
    FROM blog_posts WHERE published = 1 ORDER BY created_at DESC
  `).all();
  res.json(rows.map(r => ({ ...r, date: r.created_at, readTime: r.read_time, content: JSON.parse(r.content) })));
});

app.get("/api/blog/:slug", (req, res) => {
  const row = db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND published = 1").get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Post not found." });
  row.content = JSON.parse(row.content);
  row.date = row.created_at;
  row.readTime = row.read_time;
  res.json(row);
});

app.post("/api/blog", requireAdmin, (req, res) => {
  const { slug, title, category, excerpt, content, cover, author, readTime, published = 1 } = req.body;
  if (!slug || !title || !category || !Array.isArray(content)) {
    return res.status(400).json({ error: "slug, title, category and content[] are required." });
  }
  try {
    const result = db.prepare(`
      INSERT INTO blog_posts
      (slug, title, category, excerpt, content, cover, author, read_time, published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(slug, title, category, excerpt || "", JSON.stringify(content), cover || "", author || "Aurelia", readTime || "", published ? 1 : 0);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (e) {
    res.status(409).json({ error: "A post with this slug already exists." });
  }
});

app.put("/api/blog/:id", requireAdmin, (req, res) => {
  const { slug, title, category, excerpt, content, cover, author, readTime, published = 1 } = req.body;
  if (!slug || !title || !category || !Array.isArray(content)) {
    return res.status(400).json({ error: "slug, title, category and content[] are required." });
  }
  const result = db.prepare(`
    UPDATE blog_posts SET slug=?, title=?, category=?, excerpt=?, content=?, cover=?, author=?, read_time=?, published=?, updated_at=CURRENT_TIMESTAMP
    WHERE id=?
  `).run(slug, title, category, excerpt || "", JSON.stringify(content), cover || "", author || "Aurelia", readTime || "", published ? 1 : 0, req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Post not found." });
  res.json({ message: "Post updated." });
});

app.delete("/api/blog/:id", requireAdmin, (req, res) => {
  const result = db.prepare("DELETE FROM blog_posts WHERE id=?").run(req.params.id);
  if (!result.changes) return res.status(404).json({ error: "Post not found." });
  res.json({ message: "Post deleted." });
});

app.listen(PORT, () => {
  console.log(`Makeup Artist API running at http://localhost:${PORT}`);
});
