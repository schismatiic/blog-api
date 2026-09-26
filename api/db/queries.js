import { prisma } from "../lib/prisma.js";
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

export default { createUser, getUsername, getEmail };
