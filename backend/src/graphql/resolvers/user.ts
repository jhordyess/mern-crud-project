import bcryptjs from 'bcryptjs'
import response from '@/utils/routes.response'
import { env } from 'node:process'
import { Resolvers } from '@/types'

const secret = env.SECRET || null

const userResolvers: Resolvers = {
  Mutation: {
    register: async (_, { input }, { prisma }) => {
      const { username, email, password } = input

      if (!(username && email && password)) throw response.throw({ message: `Invalid properties` })
      if (secret === null) throw response.throw({ message: "Can't create user!" })

      const emailExists = await prisma.user.count({
        where: { email: email }
      })
      if (emailExists) throw response.throw({ message: `The email: ${email} already exists` })

      const _password = await bcryptjs.hash(password, 10)

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: _password
        }
      })
      await prisma.$disconnect()

      if (typeof newUser.id === 'undefined') throw response.throw({ message: "Can't create user!" })
      return response.normal({
        statusCode: 201,
        data: {
          user: { ...newUser, password: null },
          message: 'User created'
        }
      })
    },

    login: async (_, { input }, { prisma }) => {
      const { email, password } = input

      if (!(email && password)) throw response.throw({ message: `Invalid properties` })

      const user = await prisma.user.findFirst({
        where: { email: email }
      })
      if (!user) throw response.throw({ message: `The email: ${email} not exists` })

      const passwordMatch = await bcryptjs.compare(password, user.password)
      if (!passwordMatch) throw response.throw({ message: "Password don't match" })

      if (secret === null) throw response.throw({ message: "Can't create token!" })

      return response.normal({
        statusCode: 201,
        data: {
          user: { ...user, password: null },
          message: 'Login successful'
        }
      })
    }
  }
}

export default userResolvers
