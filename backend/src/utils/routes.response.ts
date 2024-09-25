type Response = {
  normal: (param: { statusCode?: number; status?: string; data?: object }) => object
  throw: (param: {
    statusCode?: number
    status?: string
    message: string
    publicError?: boolean
  }) => object
}

const response: Response = {
  normal: ({ statusCode = 200, status = 'OK', data = {} }) => ({
    statusCode,
    status,
    data
  }),

  throw: ({ statusCode = 500, status = 'FAILED', message, publicError = true }) => ({
    statusCode,
    status,
    message,
    publicError
  })
}

export default response
