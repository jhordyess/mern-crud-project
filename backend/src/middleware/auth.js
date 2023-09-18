import jwt from 'jsonwebtoken'
import process from 'process'
import response from '../utils/routes.response.js'
import BaseController from '../controllers/base.controller.js'

export const checkToken = async (req, res, next) => {
  if (!req.headers.authorization)
    throw response.throw({ statusCode: 401, message: `Access token needed 1` })

  const token = req.headers.authorization.replace(/^Bearer\s+/, '')

  if (!token) throw response.throw({ statusCode: 401, message: `Access token needed 2` })

  const id = jwt.verify(token, process.env.SECRET)
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
  req.user_id = id
  next()
}
