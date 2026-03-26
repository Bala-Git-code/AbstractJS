function validate(schema, property = 'body') {
  return function validationMiddleware(req, res, next) {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next({
        statusCode: 400,
        message: 'Validation failed',
        details: error.details.map((detail) => detail.message),
      });
    }

    req[property] = value;
    return next();
  };
}

module.exports = validate;
