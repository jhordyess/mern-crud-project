import { mergeResolvers } from '@graphql-tools/merge'

import employee from './employee'
import user from './user'

const resolvers = mergeResolvers([employee, user])

export default resolvers
