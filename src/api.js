const API_ROOT = "http://localhost:3000";
const HEADERS = { "Content-Type": "application/json" };
async function request(url, options = {}) {
  const headers = options.headers
    ? { ...options.headers, ...HEADERS }
    : HEADERS;
  const response = await fetch(url, {
    ...options,
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Bad request");
  }
  return response;
}
export async function getNotes() {
  const response = await request(`${API_ROOT}/notes`);
  const data = await response.json();
  return data;
}
export async function createNote(values) {
  const response = await request(`${API_ROOT}/notes`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: HEADERS,
  });
  const data = await response.json();
  return data;
}
export async function deleteNote(id) {
  return await request(`${API_ROOT}/notes/${id}`, {
    method: "DELETE",
  });
}
export async function updateNote(id, updates) {
  const response = await request(`${API_ROOT}/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
    headers: HEADERS,
  });
  return await response.json();
}

