const API_URL = import.meta.env.VITE_API_URL;

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

export { getPosts, getPostById, getComments };
