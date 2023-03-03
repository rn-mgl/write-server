const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (err, req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json("This does not belong to us.");
};

module.exports = notFoundMiddleware;
