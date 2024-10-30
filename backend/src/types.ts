import { type DocumentNode } from 'graphql'
import { type GraphQLResolverMap } from '@apollo/subgraph/dist/schema-helper'

export type TypeDefs = DocumentNode

export type Resolvers = GraphQLResolverMap<Context>

export type Context = {
  prisma: import('@prisma/client').PrismaClient
  secret: string | null
}
