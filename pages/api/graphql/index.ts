import { createServer } from '@graphql-yoga/node'
import { PostSchema } from './_Post'
import { UserSchema } from './_User'


const modelTypeDefs = `
  type Category {
    name: String!
  }

  type EditorContent {
    ele: String!
    content: String!
  }

  type Post {
    createdAt: String!
    author: User!
    editorContent: [EditorContent!]!
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


