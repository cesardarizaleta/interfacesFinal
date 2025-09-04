const boom = require('@hapi/boom');

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return; // Don't call next() when we've handled the error
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  // Since no ORM, just pass
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
