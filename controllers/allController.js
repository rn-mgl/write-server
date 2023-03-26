const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const All = require("../models/All");
const Note = require("../models/Note");
const Folder = require("../models/Folder");

const getAllFiles = async (req, res) => {
  const { id } = req.user;

  const data = await All.getAllFiles(id);

  if (!data) {
    throw new BadRequestError(`Error in getting all files.`);
  }

  res.status(StatusCodes.OK).json(data);
};

const deleteAllFiles = async (req, res) => {
  const { notes, folders } = req.body;

  if (notes.length) {
    notes.forEach(async (note) => {
      const data = Note.deleteNote(note);
      if (!data) {
        throw new BadRequestError(`Error in deleting note ${note}.`);
      }
    });
  }

  if (folders.length) {
    folders.forEach(async (folder) => {
      const data = await Folder.deleteFolder(folder);
      if (!data) {
        throw new BadRequestError(`Error in deleting folder ${folder}.`);
      }
    });
  }

  res.status(StatusCodes.OK).json({ msg: "deleted all files" });
};

module.exports = { getAllFiles, deleteAllFiles };
