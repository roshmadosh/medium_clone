import { userDAO } from "../data_access";
import type { UserInput } from "../data_access/_User";


const typeDefs = `
  input UserInput {
    email: String!
    username: String!
    password: String!
    role: String
  }

  type Category {
    name: String!
  }

  type Post {
    createdAt: String!
    title: String!
    content: String!
    category: Category
  }

  type Comment {
    createdAt: String!
    content: String!
    author: User!
    post: Post!
    replies: [Comment!]!
  }

  type User {
    email: String!
    username: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    createUser(input: UserInput!): User
  }
`

const resolvers = {
  Query: {
    async getUsers() {
      const users = await userDAO.getUsers();
      console.log('USERS', users);
      return users;
    }
  },
  Mutation: {
    async createUser(parent, args: UserInput , context) {
      return await userDAO.createUser(args);
    }
  }
}

export const UserSchema = {
  typeDefs,
  resolvers
}