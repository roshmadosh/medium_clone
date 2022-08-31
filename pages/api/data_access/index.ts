import { userDAO } from "./_User";
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export {
  userDAO
}