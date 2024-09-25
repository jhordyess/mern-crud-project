import { type Request } from 'express'

import BaseController from './base.controller'
import response from '../utils/routes.response'

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import process from 'node:process'

const secret = process.env.SECRET || null

export default class userCtrl extends BaseController {
  register = async (req: Request) => {
    const { username, email, password } = req.body

    if (!(username && email && password)) throw response.throw({ message: `Invalid properties` })
    if (secret === null) throw response.throw({ message: "Can't create user!" })

    const emailExists = await this.prisma.user.count({
      where: { email: email }
    })
    if (emailExists) throw response.throw({ message: `The email: ${email} already exists` })

    const _password = await bcryptjs.hash(password, 10)

    const newUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password: _password
      }
    })
    await this.disconnect()

    const token = jwt.sign(newUser.id, secret)

    if (typeof newUser.id === 'undefined') throw response.throw({ message: "Can't create user!" })
    return response.normal({
      statusCode: 201,
      data: {
        user: { ...newUser, password: null, token },
        message: 'User created'
      }
    })
  }

  login = async (req: Request) => {
    const { email, password } = req.body

    if (!(email && password)) throw response.throw({ message: `Invalid properties` })

    const user = await this.prisma.user.findFirst({
      where: { email: email }
    })
    if (!user) throw response.throw({ message: `The email: ${email} not exists` })

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) throw response.throw({ message: "Password don't match" })

    if (secret === null) throw response.throw({ message: "Can't create token!" })
    const token = jwt.sign(user.id, secret)

    return response.normal({
      statusCode: 201,
      data: {
        user: { ...user, password: null, token },
        message: 'Login successful'
      }
    })
  }
}
