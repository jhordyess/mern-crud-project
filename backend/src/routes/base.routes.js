import { Router } from 'express'

const handleError = error => {
  if (!error.publicError) console.error(error?.message || error)
  return {
    statusCode: error?.statusCode || 500,
    status: error?.status || 'FAILED',
    data: {
      error: !error.publicError
        ? 'Please review the logs'
        : error?.message || 'An error?, Yeah, but where?'
    }
  }
}

const middleware = request =>
  request
    ? async function (req, res, next) {
        try {
          await request(req, res, next)
        } catch (error) {
          const { statusCode, status, data } = handleError(error)
          res.status(statusCode || 500).json({ status, data })
        }
      }
    : function (req, res, next) {
        next()
      }

const handleRequest = request =>
  request
    ? async function (req, res) {
        let result = {}
        try {
          result = await request(req, res)
        } catch (error) {
          result = handleError(error)
        } finally {
          const { statusCode, status, data } = result
          res.status(statusCode || 500).json({ status, data })
        }
      }
    : undefined

export default function BaseRouter(routes = []) {
  let router = Router()

  for (let route of routes) {
    switch (route.method) {
      case 'GET':
        router.get(route.path, middleware(route.mWare), handleRequest(route.func))
        break
      case 'POST':
        router.post(route.path, middleware(route.mWare), handleRequest(route.func))
        break
      case 'PUT':
        router.put(route.path, middleware(route.mWare), handleRequest(route.func))
        break
      case 'DELETE':
        router.delete(route.path, middleware(route.mWare), handleRequest(route.func))
        break
      default:
        break
    }
  }
  return router
}
