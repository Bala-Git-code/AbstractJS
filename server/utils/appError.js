function appError(message, statusCode = 400, details) {
  return {
    message,
    statusCode,
    details,
  };
}

module.exports = appError;
