const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  //err.message = error.message;
  if (error.name === "CastError") {
    const message = `User with id ${error.value} was not found`;
    error = new ErrorResponse(message, 404, error.name, error.value);
  }
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    statusCode: error.statusCode,
    type: error.name,
  });
};

module.exports = errorHandler;
