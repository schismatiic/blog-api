import bcrypt from "bcryptjs";
import "dotenv/config";
import { prisma } from "../lib/prisma.js";

const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

await prisma.users.create({
  data: {
    firstName: "Admin",
    lastName: "User",
    username: "admin",
    email: "admin@email.com",
    password: hashedPassword,
    role: "ADMIN",
  },
});

await prisma.$disconnect();
