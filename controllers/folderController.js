const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Folder = require("../models/Folder");
const crypto = require("crypto");

const createFolder = async (req, res) => {
  const { id } = req.user;
  const { name, path } = req.body;

  const folderKey = crypto.randomBytes(20).toString("hex");

  const folder = new Folder(folderKey, id, name, path);

  const newFolder = await folder.createFolder();

  if (!newFolder) {
    throw new BadRequestError(`Error in making new folder.`);
  }

  res.status(StatusCodes.OK).json(newFolder);
};

const updateName = async (req, res) => {
  const { folderId } = req.params;
  const { name } = req.body;

  const folder = await Folder.updateName(folderId, name);

  if (!folder) {
    throw new BadRequestError(`Error in making changin folder name.`);
  }

  res.status(StatusCodes.OK).json(folder);
};

const deleteFolder = async (req, res) => {
  const { folderId } = req.params;

  const folder = await Folder.deleteFolder(folderId);

  if (!folder) {
    throw new BadRequestError(`Error in deleting folder.`);
  }

  res.status(StatusCodes.OK).json(folder);
};

const getAllFolders = async (req, res) => {
  const { id } = req.user;
  const { path } = req.body;

  const folder = await Folder.getAllFolders(id, path);

  if (!folder) {
    throw new NotFoundError(`Error in making getting folders.`);
  }

  res.status(StatusCodes.OK).json(folder);
};

const getFolder = async (req, res) => {
  const { id } = req.user;
  const { folderKey } = req.params;

  const { files, folder } = await Folder.getFolder(id, folderKey);

  if (!folder || !files) {
    throw new NotFoundError(`Error in making getting folder.`);
  }

  res.status(StatusCodes.OK).json({ folder: folder[0], files });
};

module.exports = { createFolder, updateName, deleteFolder, getAllFolders, getFolder };
