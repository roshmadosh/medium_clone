import { PrismaClient, Prisma } from '@prisma/client'

type Role = 'ADMIN' | 'USER';
export type UserInput = {
  email: string, 
  username: string, 
  password: string, 
  role?: Role
}
const prisma = new PrismaClient();

async function getUsers() {
  return await prisma.user.findMany()
    .then((users) => {
      return users;
    }).catch((e) => {
      console.error(e);
    }).finally(async () => {
      await prisma.$disconnect();
    })
}

async function createUser(input: UserInput) {
  const { email, username, password, role } = input;
  let user: Prisma.UserCreateInput = {
    email,
    username,
    password, 
    ...[role && {...{ role }}]
    }

  // Pass 'user' object into query
  return await prisma.user.create({ data: user })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return null;
    })
}

export const userDAO = { 
  getUsers,
  createUser,
}