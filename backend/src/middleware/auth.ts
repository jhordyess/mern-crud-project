import jwt from 'jsonwebtoken'
import process from 'process'
import response from '../utils/routes.response'
import BaseController from '../controllers/base.controller'

import type { Request, Response, NextFunction } from 'express'

const secret = process.env.SECRET || null

export const checkToken = async (req: Request, _: Response, next: NextFunction) => {
  if (!req.headers.authorization)
    throw response.throw({ statusCode: 401, message: `Access token needed 1` })

  const token = req.headers.authorization.replace(/^Bearer\s+/, '')

  if (!token) throw response.throw({ statusCode: 401, message: `Access token needed 2` })

  if (!secret) throw response.throw({ message: "Can't create user!" })

  const id = jwt.verify(token, secret)
  if (typeof id !== 'string')
    throw response.throw({
      statusCode: 401,
      message: `Access token needed 3`
    })

  const bc = new BaseController()
  const user = await bc.prisma.user.findFirst({
    where: {
      id
    }
  })
  bc.disconnect()
  if (!user)
    throw response.throw({
      statusCode: 401,
      message: `Access token needed 2`
    })
  next()
}
