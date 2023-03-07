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
  console.log(error);
  // mongoose validation
  if ((error.name = "ValidationError")) {
    error = new ErrorResponse(error.message, 400, error.name, "none");
  }

  if (error.code === 11000) {
    //mongoose duplicate key error
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400, error.name, "none");
  }
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
    statusCode: error.statusCode,
    type: error.name,
  });
  console.log("going through this");
  next();
};

module.exports = errorHandler;
