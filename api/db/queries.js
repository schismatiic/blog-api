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

export default {
  createUser,
  getIdentifier,
  getUsername,
  getEmail,
  getPosts,
  getPostById,
};
