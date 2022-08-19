import { createServer } from '@graphql-yoga/node'


const typeDefs = /* GraphQL */ `
  type Query {
    hello(name: String!): String!
  }
`

const resolvers = {
  Query: {
    hello(_, { name }, _context) {
      return `Hello ${name}`
    },
  },
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server

