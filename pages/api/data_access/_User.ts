import { PrismaClient, Prisma } from '@prisma/client';
import { hashGenerator } from 'utils/security/hashGenerator';

type Role = 'ADMIN' | 'USER';

const prisma = new PrismaClient();

async function getUsers() {
  return await prisma.user.findMany()
    .catch(async (e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    })  
}

async function createUser(email: string, username: string, password: string, role?: Role ) {
  const hashedPassword = hashGenerator(password);
  let user: Prisma.UserCreateInput = {
    email,
    username,
    password: hashedPassword, 
    ...(role && {...{ role }})
    }


  // Pass 'user' object into query
  return await prisma.user.create({ data: user })
    .catch((e) => {
      // log error on server side
      console.error(e);
      // propogate error to GQL layer
      throw new Error("USER-GENERATED: Prisma failed to complete transaction. Details available in server logs.");
    }).finally(async() => {
      await prisma.$disconnect();
    })
}

export const userDAO = { 
  getUsers,
  createUser,
}