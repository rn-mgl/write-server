const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const All = require("../models/All");

const getAllFiles = async (req, res) => {
  const { id } = req.user;

  const data = await All.getAllFiles(id);

  if (!data) {
    throw new BadRequestError(`Error in getting all files.`);
  }

  res.status(StatusCodes.OK).json(data);
};

module.exports = { getAllFiles };
