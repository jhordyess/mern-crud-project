import { PrismaClient } from '@prisma/client'

export default class BaseController {
  prisma

  constructor() {
    this.prisma = new PrismaClient()
  }

  disconnect = async () => {
    await this.prisma.$disconnect()
  }
}
