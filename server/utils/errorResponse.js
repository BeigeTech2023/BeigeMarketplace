class ErrorResponse extends Error {
  constructor(message, statusCode, name = "", value = "") {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.value = value;
  }
}

module.exports = ErrorResponse;
