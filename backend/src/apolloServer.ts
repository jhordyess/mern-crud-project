import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import resolvers from '@/graphql/resolvers/employee'
import typeDefs from '@/graphql/types'

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
})

await server.start()

export { server }
