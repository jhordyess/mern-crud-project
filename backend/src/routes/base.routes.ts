import { type RequestHandler, Router, type Request } from 'express'

//TODO Create an implementation of the class Error with the following properties: publicError, statusCode, status, message and compare here with instance of ...

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
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

const middleware = (request?: RequestHandler): RequestHandler =>
  request
    ? (req, res, next) => {
        try {
          request(req, res, next)
        } catch (error) {
          const handledError = handleError(error)
          if (handledError) {
            res
              .status(handledError?.statusCode || 500)
              .json({ status: handledError?.status, data: handledError?.data })
          }
        }
      }
    : (_req, _res, next) => {
        next()
      }

const handleRequest = (request?: (req: Request) => Promise<object>): RequestHandler | [] =>
  request
    ? async (req, res) => {
        let result: {
          statusCode?: number
          status?: string
          data?: object
        } = {}
        try {
          result = await request(req)
        } catch (error) {
          const handledError = handleError(error)
          if (handledError) result = handledError
        } finally {
          const { statusCode, status, data } = result
          res.status(statusCode || 500).json({ status, data })
        }
      }
    : []

export default function BaseRouter(
  routes: Array<{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    mWare?: RequestHandler
    func?: (req: Request) => Promise<object>
  }> = []
) {
  const router = Router()

  for (const route of routes) {
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
