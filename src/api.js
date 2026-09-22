const API_BASE = import.meta.env.VITE_API_URL || "/api";

const adminHeaders = () => {
  const token = localStorage.getItem("makeup_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  health: () => request("/health"),
  createBooking: (data) => request("/bookings", { method: "POST", body: JSON.stringify(data) }),
  createContact: (data) => request("/contacts", { method: "POST", body: JSON.stringify(data) }),
  adminLogin: (password) => request("/admin/login", { method: "POST", body: JSON.stringify({ password }) }),
  adminLogout: () => request("/admin/logout", { method: "POST", headers: adminHeaders() }),
  getBookings: () => request("/bookings", { headers: adminHeaders() }),
  updateBooking: (id, status) => request(`/bookings/${id}`, { method: "PATCH", headers: adminHeaders(), body: JSON.stringify({ status }) }),
  getContacts: () => request("/contacts", { headers: adminHeaders() }),
  updateContact: (id, status) => request(`/contacts/${id}`, { method: "PATCH", headers: adminHeaders(), body: JSON.stringify({ status }) }),
  getAdminBlogPosts: () => request("/admin/blog", { headers: adminHeaders() }),
  createBlogPost: (data) => request("/blog", { method: "POST", headers: adminHeaders(), body: JSON.stringify(data) }),
  updateBlogPost: (id, data) => request(`/blog/${id}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(data) }),
  deleteBlogPost: (id) => request(`/blog/${id}`, { method: "DELETE", headers: adminHeaders() }),
  getBlogPosts: () => request("/blog"),
  getBlogPost: (slug) => request(`/blog/${encodeURIComponent(slug)}`),
};
