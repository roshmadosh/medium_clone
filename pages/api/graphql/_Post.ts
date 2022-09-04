import { postDAO } from "../data_access";

const typeDefs = `
  input EditorContentInput {
    ele: String!
    content: String!
  }
  input PostInput {
    email: String!
    editorContent: [EditorContentInput!]!
  }

  type Query {
    getPostsByUserId(authorId: Int!): [Post]
  }

  type Mutation {
    createPost(input: PostInput!): Post
  }
`;

const resolvers = {
  Query: {
    async getPostsByUserId(parent, args, context) {
      return await postDAO.getPostsByUserId(args.authorId);
    }
  },
  Mutation: {
    async createPost(parent, args, context) {
      const { email, editorContent } = args.input;
      return await postDAO.createPost(email, editorContent);
    }
  }
}


export const PostSchema = {
  typeDefs,
  resolvers,
}