import response from './../utils/routes.response.js'
import BaseController from './base.controller.js'

export default class employeeCtl extends BaseController {
  listAllEmployees = async () => {
    const employees = await this.prisma.employee.findMany({
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
    await this.disconnect()
    return response.normal({
      data: { employees, message: 'Employee list' }
    })
  }

  createEmployee = async req => {
    const { lastname, firstname, title, country, userId } = req.body
    if (!(lastname && firstname && title && country && userId))
      throw response.throw({ message: 'Invalid properties' })
    const userExists = await this.prisma.user.count({
      where: { id: userId }
    })
    if (userExists !== 1) throw response.throw({ message: "User ID doesn't exists" })
    const employee = await this.prisma.employee.create({
      data: {
        lastname,
        firstname,
        title,
        country,
        userId
      }
    })
    if (typeof employee.id === 'undefined')
      throw response.throw({ message: "Can't create employee!" })
    await this.disconnect()
    return response.normal({
      statusCode: 201,
      data: { employee, message: 'Employee created' }
    })
  }

  updateEmployee = async req => {
    const { id } = req.params
    const { lastname, firstname, title, country } = req.body
    if (!(lastname && firstname && title && country && id))
      throw response.throw({ message: 'Invalid properties' })
    const employee = await this.prisma.employee.findFirst({
      where: {
        id
      }
    })
    if (!employee) throw response.throw({ message: 'Employee not found!', statusCode: 404 })
    const uEmployee = await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        lastname,
        firstname,
        title,
        country
      }
    })
    return response.normal({
      statusCode: 200,
      data: { employee: uEmployee, message: 'Employee updated' }
    })
  }

  dropEmployee = async req => {
    const { id } = req.params
    const employee = await this.prisma.employee.findFirst({
      where: {
        id
      }
    })
    if (!employee) throw response.throw({ message: 'Employee not found!', statusCode: 404 })
    await this.prisma.employee.delete({
      where: {
        id
      }
    })
    await this.disconnect()
    return response.normal({
      statusCode: 200,
      data: { employee, message: 'Employee deleted' }
    })
  }

  listByUserId = async req => {
    const { id } = req.params
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId: id
      }
    })
    await this.disconnect()
    if (!employee) throw response.throw({ message: 'Employee not found!', statusCode: 404 })
    return response.normal({ statusCode: 200, data: { employee } })
  }

  searchEmployee = async req => {
    const name = String(req.params.name)
    const employees = await this.prisma.employee.findMany({
      where: {
        OR: [
          {
            lastname: {
              contains: name,
              mode: 'insensitive'
            }
          },
          {
            firstname: {
              contains: name,
              mode: 'insensitive'
            }
          }
        ]
      }
    })
    await this.disconnect()
    return response.normal({
      data: { employees, message: `Employees matched: ${employees.length}` }
    })
  }
}
