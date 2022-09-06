import { userDAO } from "./_User";
import { postDAO } from "./_Post";
import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

export {
  userDAO,
  postDAO
}