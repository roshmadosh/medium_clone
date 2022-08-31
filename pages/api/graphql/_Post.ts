import { postDAO } from "../data_access";

const typeDefs = `
  input PostInput {
    email: String!
    title: String!
    content: String!
  }

  type Mutation {
    createPost(input: PostInput!): Post
  }
`;

const resolvers = {
  Mutation: {
    async createPost(parent, args, context) {
      const { email, title, content } = args;
      return await postDAO.createPost(email, title, content);
    }
  }
}


export const PostSchema = {
  typeDefs,
  resolvers,
}