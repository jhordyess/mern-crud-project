import { PrismaClient } from '@prisma/client'
import { Context } from './types'
import { env } from 'node:process'

const prisma = new PrismaClient()
const secret = env.SECRET || null

export const createContext = async (): Promise<Context> => ({
  prisma,
  secret
})
