import { prisma, Prisma } from "@prisma/client";
import { prismaClient } from "./";

async function createPost(email: string, title: string, content: string) {
  let post: Prisma.PostCreateInput = {
    author: {
      connect: {
        email
      }
    },
    title,
    content
  }

  return await prismaClient.post.create({ data: post })
    .catch(e => {
      console.error(e);
      throw new Error("USER-GENERATED: Prisma failed to create Post.")
    }).finally(async() => {
      await prismaClient.$disconnect();
    })

}

export const postDAO = {
  createPost
}