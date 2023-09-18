const response = {}

response.normal = ({ statusCode = 200, status = 'OK', data = {} }) => {
  return {
    statusCode,
    status,
    data
  }
}

response.throw = ({ statusCode = 500, status = 'FAILED', message, publicError = true }) => {
  return {
    statusCode,
    status,
    message,
    publicError
  }
}

export default response
