const { StatusCodes } = require("http-status-codes");

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `The problem is on our side. Please wait for a while.`,
  };

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorMiddleware;
