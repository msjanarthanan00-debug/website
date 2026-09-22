import { useEffect, useMemo, useState } from "react";
import { LogOut, CalendarDays, Mail, FileText, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { api } from "@/api";

const emptyPost = { id: null, slug: "", title: "", category: "Bridal", excerpt: "", content: "", cover: "", author: "Aurelia", readTime: "5 min read", published: true };

function dateText(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("makeup_admin_token") || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(emptyPost);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const loggedIn = Boolean(token);
  const counts = useMemo(() => ({
    bookings: bookings.filter((b) => b.status === "pending").length,
    contacts: contacts.filter((c) => c.status === "new").length,
    posts: posts.length,
  }), [bookings, contacts, posts]);

  async function loadAll() {
    setLoading(true);
    try {
      const [b, c, p] = await Promise.all([api.getBookings(), api.getContacts(), api.getAdminBlogPosts()]);
      setBookings(b); setContacts(c); setPosts(p);
    } catch (err) {
      if (err.message.includes("authentication")) logout();
      else setNotice(err.message);
    } finally { setLoading(false); }
  }

  useEffect(() => { if (loggedIn) loadAll(); }, [loggedIn]);

  async function login(e) {
    e.preventDefault(); setLoginError("");
    try {
      const data = await api.adminLogin(password);
      localStorage.setItem("makeup_admin_token", data.token); setToken(data.token); setPassword("");
    } catch (err) { setLoginError(err.message); }
  }

  async function logout() {
    try { await api.adminLogout(); } catch {}
    localStorage.removeItem("makeup_admin_token"); setToken("");
  }

  async function updateStatus(type, id, status) {
    try {
      if (type === "booking") await api.updateBooking(id, status);
      else await api.updateContact(id, status);
      await loadAll(); setNotice("Updated successfully.");
    } catch (err) { setNotice(err.message); }
  }

  function editPost(item) {
    setPost({ ...item, content: Array.isArray(item.content) ? item.content.join("\n\n") : item.content || "", published: Boolean(item.published) });
    setEditing(true); setTab("blog"); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function savePost(e) {
    e.preventDefault(); setNotice("");
    const payload = { ...post, content: post.content.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean) };
    try {
      if (post.id) await api.updateBlogPost(post.id, payload); else await api.createBlogPost(payload);
      setPost(emptyPost); setEditing(false); await loadAll(); setNotice("Blog post saved.");
    } catch (err) { setNotice(err.message); }
  }

  async function deletePost(id) {
    if (!window.confirm("Delete this blog post?")) return;
    try { await api.deleteBlogPost(id); await loadAll(); setNotice("Blog post deleted."); } catch (err) { setNotice(err.message); }
  }

  if (!loggedIn) return (
    <main className="min-h-screen bg-beauty-charcoal text-white flex items-center justify-center px-6">
      <form onSubmit={login} className="w-full max-w-md glass-dark p-8">
        <div className="text-beauty-gold text-xs tracking-[0.25em] uppercase mb-4">Private Area</div>
        <h1 className="font-serif text-4xl">Admin Dashboard</h1>
        <p className="text-white/60 text-sm mt-3 mb-8">Manage bookings, contact messages and your beauty journal.</p>
        {loginError && <div className="mb-5 text-sm text-red-200 bg-red-500/10 border border-red-300/20 p-3">{loginError}</div>}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" className="w-full bg-white/5 border border-white/15 px-4 py-3 outline-none" required />
        <button className="btn-primary w-full mt-5">Sign In</button>
        <a href="/" className="block text-center text-white/50 text-sm mt-5 hover:text-white">Back to website</a>
      </form>
    </main>
  );

  const tabs = [
    ["bookings", "Bookings", CalendarDays, counts.bookings],
    ["contacts", "Messages", Mail, counts.contacts],
    ["blog", "Blog", FileText, counts.posts],
  ];

  return (
    <main className="min-h-screen bg-beauty-ivory text-beauty-charcoal">
      <header className="bg-beauty-charcoal text-white px-6 lg:px-10 py-5 flex items-center justify-between sticky top-0 z-30">
        <div><div className="text-beauty-gold text-[10px] tracking-[0.25em] uppercase">Studio Admin</div><h1 className="font-serif text-2xl">Makeup Artist Dashboard</h1></div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-white/70 hover:text-white"><LogOut size={16}/> Logout</button>
      </header>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(([id, label, Icon, count]) => <button key={id} onClick={() => setTab(id)} className={`px-5 py-3 border flex items-center gap-2 text-sm ${tab === id ? "bg-beauty-charcoal text-white border-beauty-charcoal" : "bg-white border-black/10"}`}><Icon size={16}/>{label}<span className="text-xs opacity-60">{count}</span></button>)}
        </div>
        {notice && <div className="mb-6 p-3 bg-white border border-black/10 text-sm">{notice}</div>}
        {loading && <div className="mb-5 text-sm text-black/50">Refreshing data…</div>}

        {tab === "bookings" && <section className="bg-white border border-black/10 overflow-x-auto"><div className="p-6 border-b border-black/10"><h2 className="font-serif text-3xl">Booking Requests</h2><p className="text-sm text-black/50 mt-1">Review and update appointment requests.</p></div><table className="w-full text-sm"><thead><tr className="text-left bg-black/[.03]"><th className="p-4">Client</th><th className="p-4">Event</th><th className="p-4">Date</th><th className="p-4">Contact</th><th className="p-4">Status</th></tr></thead><tbody>{bookings.map(b => <tr key={b.id} className="border-t border-black/10 align-top"><td className="p-4 font-medium">{b.name}<div className="text-xs text-black/50 mt-1">{b.location || "No location"}</div></td><td className="p-4">{b.event_type || "—"}<div className="text-xs text-black/50 mt-1">{b.style || "—"} · {b.people || 1} people</div></td><td className="p-4">{b.event_date || "—"}<div className="text-xs text-black/40 mt-1">{dateText(b.created_at)}</div></td><td className="p-4">{b.phone}<div className="text-xs text-black/50 mt-1">{b.email || "—"}</div></td><td className="p-4"><select value={b.status} onChange={e => updateStatus("booking", b.id, e.target.value)} className="border border-black/15 px-3 py-2 bg-white"><option>pending</option><option>confirmed</option><option>completed</option><option>cancelled</option></select></td></tr>)}</tbody></table>{!bookings.length && <p className="p-10 text-center text-black/40">No booking requests yet.</p>}</section>}

        {tab === "contacts" && <section className="bg-white border border-black/10"><div className="p-6 border-b border-black/10"><h2 className="font-serif text-3xl">Contact Messages</h2><p className="text-sm text-black/50 mt-1">Read and track enquiries from the website.</p></div><div className="divide-y divide-black/10">{contacts.map(c => <article key={c.id} className="p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-medium">{c.name}</h3><a className="text-sm text-beauty-gold" href={`mailto:${c.email}`}>{c.email}</a><div className="text-xs text-black/40 mt-2">{dateText(c.created_at)}</div></div><select value={c.status} onChange={e => updateStatus("contact", c.id, e.target.value)} className="border border-black/15 px-3 py-2 bg-white"><option>new</option><option>read</option><option>replied</option><option>archived</option></select></div><p className="mt-5 text-black/70 whitespace-pre-wrap leading-relaxed">{c.message}</p></article>)}{!contacts.length && <p className="p-10 text-center text-black/40">No messages yet.</p>}</div></section>}

        {tab === "blog" && <div className="grid xl:grid-cols-[1fr_1.2fr] gap-8">
          <section className="bg-white border border-black/10 p-6"><div className="flex items-center justify-between mb-6"><div><h2 className="font-serif text-3xl">{editing ? "Edit Post" : "New Post"}</h2><p className="text-sm text-black/50 mt-1">Blank lines separate paragraphs.</p></div>{editing && <button onClick={() => { setPost(emptyPost); setEditing(false); }} className="text-sm"><X size={16}/></button>}</div><form onSubmit={savePost} className="space-y-4">
            {[['title','Title'],['slug','Slug'],['category','Category'],['author','Author'],['readTime','Read time'],['cover','Cover image URL']].map(([key,label]) => <label key={key} className="block text-sm"><span className="block text-xs uppercase tracking-wider text-black/50 mb-2">{label}</span><input value={post[key]} onChange={e => setPost({...post,[key]:e.target.value})} required={['title','slug','category'].includes(key)} className="w-full border border-black/15 px-3 py-3 outline-none focus:border-beauty-gold" /></label>)}
            <label className="block text-sm"><span className="block text-xs uppercase tracking-wider text-black/50 mb-2">Excerpt</span><textarea rows="3" value={post.excerpt} onChange={e => setPost({...post,excerpt:e.target.value})} className="w-full border border-black/15 px-3 py-3 outline-none focus:border-beauty-gold" /></label>
            <label className="block text-sm"><span className="block text-xs uppercase tracking-wider text-black/50 mb-2">Content</span><textarea rows="12" value={post.content} onChange={e => setPost({...post,content:e.target.value})} required className="w-full border border-black/15 px-3 py-3 outline-none focus:border-beauty-gold" placeholder="First paragraph...\n\nSecond paragraph..." /></label>
            <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={post.published} onChange={e => setPost({...post,published:e.target.checked})} /> Published</label>
            <button className="btn-primary w-full"><Plus size={16}/>{post.id ? "Update Post" : "Publish Post"}</button>
          </form></section>
          <section className="bg-white border border-black/10"><div className="p-6 border-b border-black/10"><h2 className="font-serif text-3xl">All Posts</h2></div><div className="divide-y divide-black/10">{posts.map(p => <article key={p.id} className="p-5 flex gap-4 justify-between"><div><div className="text-xs uppercase tracking-wider text-beauty-gold">{p.category} · {p.published ? "Published" : "Draft"}</div><h3 className="font-serif text-xl mt-1">{p.title}</h3><p className="text-sm text-black/50 mt-1">/{p.slug}</p></div><div className="flex items-start gap-2"><button onClick={() => editPost(p)} className="p-2 border border-black/10 hover:border-beauty-gold" aria-label="Edit"><Pencil size={15}/></button><button onClick={() => deletePost(p.id)} className="p-2 border border-black/10 hover:border-red-400 text-red-600" aria-label="Delete"><Trash2 size={15}/></button></div></article>)}{!posts.length && <p className="p-10 text-center text-black/40">No blog posts yet.</p>}</div></section>
        </div>}
      </div>
    </main>
  );
}
