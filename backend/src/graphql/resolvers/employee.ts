// import { IResolvers } from 'graphql-tools'
import { Resolvers } from '@/types'
import response from '@/utils/routes.response'

const employeeResolvers: Resolvers = {
  Query: {
    getEmployee: async (_, { id }, { prisma }) => {
      const employee = await prisma.employee.findFirst({
        where: { id },
        select: {
          id: true,
          lastname: true,
          firstname: true,
          title: true,
          country: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true
            }
          }
        }
      })
      if (!employee) throw response.throw({ message: 'Employee not found!', statusCode: 404 })
      return response.normal({ data: { employee } })
    }
  },
  Mutation: {
    createEmployee: async (_, { input }, { prisma }) => {
      const { lastname, firstname, title, country, userId } = input
      if (!(lastname && firstname && title && country && userId))
        throw response.throw({ message: 'Invalid properties' })

      const userExists = await prisma.user.count({ where: { id: userId } })
      if (userExists !== 1) throw response.throw({ message: "User ID doesn't exist" })

      const employee = await prisma.employee.create({
        data: { lastname, firstname, title, country, userId }
      })
      if (typeof employee.id === 'undefined')
        throw response.throw({ message: "Can't create employee!" })

      return response.normal({ statusCode: 201, data: { employee, message: 'Employee created' } })
    },
    updateEmployee: async (_, { id, input }, { prisma }) => {
      const { lastname, firstname, title, country } = input
      if (!(lastname && firstname && title && country && id))
        throw response.throw({ message: 'Invalid properties' })

      const employee = await prisma.employee.findFirst({ where: { id } })
      if (!employee) throw response.throw({ message: 'Employee not found!', statusCode: 404 })

      const uEmployee = await prisma.employee.update({
        where: { id },
        data: { lastname, firstname, title, country }
      })

      return response.normal({
        statusCode: 200,
        data: { employee: uEmployee, message: 'Employee updated' }
      })
    },
    deleteEmployee: async (_, { id }, { prisma }) => {
      const employee = await prisma.employee.findFirst({ where: { id } })
      if (!employee) throw response.throw({ message: 'Employee not found!', statusCode: 404 })

      await prisma.employee.delete({ where: { id } })

      return response.normal({ statusCode: 200, data: { employee, message: 'Employee deleted' } })
    }
  }
}

export default employeeResolvers
