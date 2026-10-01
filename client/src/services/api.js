const API_URL = import.meta.env.VITE_API_URL;

// ============ CREATE ============
// ---- Users ----
const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.msg || "Failed to register user");
  }
  return data;
};
// ============ GET ============
// ---- Posts ----
const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
const getPostById = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
// ---- Comments ----
const getComments = async (postId) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
};

export { registerUser, getPosts, getPostById, getComments };
