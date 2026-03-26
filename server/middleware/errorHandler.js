function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const payload = {
    message: err.message || 'Internal server error',
  };

  if (process.env.NODE_ENV !== 'production' && err.details) {
    payload.details = err.details;
  }

  res.status(statusCode).json(payload);
}

module.exports = errorHandler;
