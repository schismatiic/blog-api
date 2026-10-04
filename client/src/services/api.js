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
const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.msg || "Failed to log in");
  }
  return data;
};
// ---- Comments ----
const createComment = async (content, postId, token) => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.msg || "Failed to create a comment");
  }
  return data;
};
// ============ READ ============
// ---- Users ----
const getUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
};
// ---- Posts ----
const getPosts = async (page = 1, limit = 12) => {
  const response = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}`);
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
// ============ UPDATE ============
// ---- Users ----
const updateUserAvatar = async (avatarUrl, token) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ avatarUrl }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.errors?.[0]?.msg || "Failed to update the user avatar",
    );
  }
  return data;
};

export {
  registerUser,
  loginUser,
  createComment,
  getUserProfile,
  getPosts,
  getPostById,
  getComments,
  updateUserAvatar,
};
