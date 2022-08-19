import { createServer } from '@graphql-yoga/node'
import { UserSchema } from './_User'


const server = createServer({
  schema: {
    typeDefs: UserSchema.typeDefs,
    resolvers: UserSchema.resolvers,
  },
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server

