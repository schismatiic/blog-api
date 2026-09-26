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
// ---- Comments ----
const createComment = async (content, usersId, postsId) => {
  const comment = await prisma.comments.create({
    data: {
      content,
      usersId,
      postsId,
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
// ---- Posts ----
const getPosts = async () => {
  const posts = await prisma.posts.findMany({
    where: {
      isPublished: true,
    },
  });
  return posts;
};
const getPostById = async (id) => {
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
  });
  return comments;
};

export default {
  createUser,
  createComment,
  getIdentifier,
  getUsername,
  getEmail,
  getPosts,
  getPostById,
  getComments,
};
