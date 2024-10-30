import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { Resolvers } from '@/types'

const userResolvers: Resolvers = {
  Query: {
    getUser: async (_, { at }, { prisma, secret }) => {
      if (secret === null) throw new Error(`Can't authenticate user!`)

      const id = jwt.verify(at, secret)
      if (typeof id !== 'string') throw new Error(`Access token needed`)

      const user = await prisma.user.findFirst({
        where: { id }
      })
      if (!user) throw new Error(`No user found`)

      return {
        ...user,
        password: ''
      }
    },
    getUsers: async (_, __, { prisma }) => {
      const users = await prisma.user.findMany()

      return users.map(user => ({
        ...user,
        password: ''
      }))
    }
  },
  Mutation: {
    createUser: async (_, { input }, { prisma }) => {
      const { username, email, password, role } = input

      const emailExists = await prisma.user.count({
        where: { email }
      })

      if (emailExists) throw new Error(`The email: ${email} already exists`)

      const usernameExists = await prisma.user.count({
        where: { username }
      })

      if (usernameExists) throw new Error(`The username: ${username} already exists`)

      const hashedPassword = await bcryptjs.hash(password, 10)

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role
        }
      })

      if (typeof newUser.id === 'undefined') throw new Error(`Can't create user`)
      return {
        ...newUser,
        password: ''
      }
    },

    login: async (_, { input }, { prisma, secret }) => {
      if (secret === null) throw new Error("Can't authenticate user!")

      const { email, password } = input

      const user = await prisma.user.findFirst({
        where: { email }
      })
      if (!user) throw new Error('Invalid Login')

      const passwordMatch = await bcryptjs.compare(password, user.password)
      if (!passwordMatch) throw new Error('Password does not match')

      const isActive = user.active
      if (!isActive) throw new Error('Your account is not activated yet')

      const token = jwt.sign(user.id, secret)

      return {
        token
      }
    }
  }
}

export default userResolvers
