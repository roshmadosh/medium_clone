import { postDAO } from "../data_access";

const typeDefs = `

  type EditorContent {
    ele: String!
    content: String!
  }

  type Post {
    email: String!
    editorContent: [EditorContent!]!
  }
  
  input EditorContentInput {
    ele: String!
    content: String!
  }
  input PostInput {
    email: String!
    editorContent: [EditorContentInput!]!
    
  }

  type Mutation {
    createPost(input: PostInput!): Post
  }
`;

const resolvers = {
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