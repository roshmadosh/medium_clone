import { userDAO } from "../data_access";

// typeDefs declare what fields are exposed to GQL clients
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
    id: ID!
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
// Resolvers can return 'superflous' data, as long as it contains all fields declared in the typedef of its return type (e.g.
// getUsers returns an array of objects with properties for every field in the User typedef, as well as "unexposed" properties
// like id and password).
const resolvers = {
  Query: {
    async getUsers() {
      const users = await userDAO.getUsers();
      return users;
    }
  },
  Mutation: {
    async createUser(parent, args, context) {
      const { email, username, password, role } = args.input;
      if (role) {
        return await userDAO.createUser(email, username, password, role);
      }
      return await userDAO.createUser(email, username, password);
    }
  }
}

export const UserSchema = {
  typeDefs,
  resolvers
}