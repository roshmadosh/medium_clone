import { Prisma } from "@prisma/client";
import { prismaClient } from "./";
import type { EditorContent } from "pages/new-story"

async function createPost(email: string, editorContent: EditorContent[]) {
  let post: Prisma.PostCreateInput = {
    author: {
      connect: {
        email
      }
    },
    editorContent: {
     create: [
      ...editorContent
     ]
    }
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