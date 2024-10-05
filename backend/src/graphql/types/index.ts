import gql from 'graphql-tag'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { readGraphql } from './util'

const employee = gql(readGraphql('Employee.graphql'))
const user = gql(readGraphql('User.graphql'))

const typeDefs = mergeTypeDefs([employee, user])

export default typeDefs
