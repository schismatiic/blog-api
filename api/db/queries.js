import { prisma } from "../lib/prisma.js";
// ============ CREATE ============
// ---- Users ----
const createUser = async (firstName, lastName, username, email, password) => {
  const user = await prisma.users.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password,
    },
  });
  return user;
};
// ---- Posts ----
const createPost = async (title, content, imageUrl, isPublished, usersId) => {
  const post = await prisma.posts.create({
    data: {
      title,
      content,
      imageUrl,
      isPublished,
      usersId,
    },
  });
  return post;
};
// ---- Comments ----
const createComment = async (content, usersId, postsId) => {
  const comment = await prisma.comments.create({
    data: {
      content,
      usersId,
      postsId,
    },
    include: {
      users: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
    },
  });
  return comment;
};
// ============ READ ============
// ---- Users ----
const getIdentifier = async (identifier) => {
  const user = await prisma.users.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
    },
  });
  return user;
};
const getUsername = async (username) => {
  const user = await prisma.users.findFirst({
    where: {
      username,
    },
  });
  return user;
};
const getEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return user;
};
const getUserProfile = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      avatarUrl: true,
    },
  });
  return user;
};
// ---- Posts ----
const getPosts = async () => {
  const posts = await prisma.posts.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      added: "desc",
    },
  });
  return posts;
};
const getPostById = async (id) => {
  const post = await prisma.posts.findFirst({
    where: {
      id,
      isPublished: true,
    },
  });
  return post;
};
const getAdminPosts = async () => {
  const posts = await prisma.posts.findMany();
  return posts;
};
const getAdminPostById = async (id) => {
  const post = await prisma.posts.findUnique({
    where: {
      id,
    },
  });
  return post;
};
// ---- Comments ----
const getComments = async (postsId) => {
  const comments = await prisma.comments.findMany({
    where: {
      postsId,
    },
    include: {
      users: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      added: "desc",
    },
  });
  return comments;
};
const getAdminComments = async (postsId) => {
  const comments = await prisma.comments.findMany();
  return comments;
};
// ============ UPDATE ============
// ---- Users ----
const updateUserAvatar = async (id, avatarUrl) => {
  const user = await prisma.users.update({
    where: {
      id,
    },
    data: {
      avatarUrl,
    },
  });
  return user;
};
// ---- Posts ----
const updatePost = async (id, title, content, imageUrl, isPublished) => {
  const post = await prisma.posts.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      imageUrl,
      isPublished,
    },
  });
  return post;
};
const updatePostPublished = async (id, isPublished) => {
  const post = await prisma.posts.update({
    where: {
      id,
    },
    data: {
      isPublished,
    },
  });
  return post;
};
// ============ DELETE ============
// ---- Posts ----
const deletePost = async (id) => {
  await prisma.posts.delete({
    where: {
      id,
    },
  });
};
// ---- Comments ----
const deleteComment = async (id) => {
  await prisma.comments.delete({
    where: {
      id,
    },
  });
};

export default {
  createUser,
  createPost,
  createComment,
  getIdentifier,
  getUsername,
  getEmail,
  getUserProfile,
  getPosts,
  getPostById,
  getAdminPosts,
  getAdminPostById,
  getComments,
  getAdminComments,
  updateUserAvatar,
  updatePost,
  updatePostPublished,
  deletePost,
  deleteComment,
};
