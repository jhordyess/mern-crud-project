import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'

import resolvers from '@/graphql/resolvers'
import typeDefs from '@/graphql/types'

import { Context } from './types'
//INFO: Temporary workaround for the missing type definition
import { type GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'

const server = new ApolloServer<Context>({
  schema: buildSubgraphSchema([{ typeDefs, resolvers: resolvers as GraphQLResolverMap<Context> }])
})

await server.start()

export { server }
