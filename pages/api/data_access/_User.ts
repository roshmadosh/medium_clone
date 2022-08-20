import { PrismaClient, Prisma } from '@prisma/client'

type Role = 'ADMIN' | 'USER';

const prisma = new PrismaClient();

async function getUsers() {
  return await prisma.user.findMany()
    .catch((e) => {
      console.error(e);
    }).finally(async () => {
      await prisma.$disconnect();
    })
}

async function createUser(email: string, username: string, password: string, role?: Role ) {
  let user: Prisma.UserCreateInput = {
    email,
    username,
    password, 
    ...(role && {...{ role }})
    }


  // Pass 'user' object into query
  return await prisma.user.create({ data: user })
    .then(result => {
      return result
    })
    .catch(async (e) => {
      console.error(e);
    }).finally(async () => {
      await prisma.$disconnect();
    })
}

export const userDAO = { 
  getUsers,
  createUser,
}