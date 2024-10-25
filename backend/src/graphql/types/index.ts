import gql from 'graphql-tag'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { readGraphql } from './util'

const user = gql(readGraphql('User.graphql'))

const typeDefs = mergeTypeDefs([user])

export default typeDefs
