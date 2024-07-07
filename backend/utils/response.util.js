const sendSuccessResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    message,
    data,
  })
}

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    message,
  })
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
}
