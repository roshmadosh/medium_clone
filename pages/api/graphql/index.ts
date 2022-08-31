import { createServer } from '@graphql-yoga/node'
import { PostSchema } from './_Post'
import { UserSchema } from './_User'


const modelTypeDefs = `
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
`
const server = createServer({
  schema: {
    typeDefs: [
      modelTypeDefs,
      UserSchema.typeDefs,
      PostSchema.typeDefs
    ],
    resolvers: [
      UserSchema.resolvers,
      PostSchema.resolvers
    ]
  },
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server


