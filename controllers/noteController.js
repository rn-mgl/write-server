const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Note = require("../models/Note");
const crypto = require("crypto");

const createNote = async (req, res) => {
  const { id } = req.user;
  let { name, path, content } = req.body;

  path = path === undefined ? 0 : path;

  const noteKey = crypto.randomBytes(20).toString("hex");

  const note = new Note(noteKey, id, name, path, content);

  const newNote = await note.createNote();

  if (!newNote) {
    throw new BadRequestError(`Error in making new note.`);
  }

  res.status(StatusCodes.OK).json(newNote);
};

const updateNote = async (req, res) => {
  const { noteKey } = req.params;
  const { type } = req.query;

  if (type === "content") {
    const { name, content } = req.body;

    const note = await Note.updateNote(name, content, noteKey);

    if (!note) {
      throw new BadRequestError(`Error in changing note name.`);
    }

    res.status(StatusCodes.OK).json(note);
    return;
  } else if (type === "noteColor") {
    const { noteColor } = req.body;

    const note = await Note.updateNoteColor(noteKey, noteColor);

    if (!note) {
      throw new BadRequestError(`Error in changing note color.`);
    }

    res.status(StatusCodes.OK).json(note);

    return;
  } else if (type === "textColor") {
    const { textColor } = req.body;

    const note = await Note.updateTextColor(noteKey, textColor);

    if (!note) {
      throw new BadRequestError(`Error in changing note color.`);
    }

    res.status(StatusCodes.OK).json(note);

    return;
  } else {
    throw new BadRequestError(`This type of update is not allowed.`);
  }
};

const deleteNote = async (req, res) => {
  const { noteKey } = req.params;

  const note = await Note.deleteNote(noteKey);

  if (!note) {
    throw new BadRequestError(`Error in deleting note.`);
  }

  res.status(StatusCodes.OK).json(note);
};

const getAllNotes = async (req, res) => {
  const { id } = req.user;
  const { path } = req.query;

  const note = await Note.getAllNotes(id, path);

  if (!note) {
    throw new NotFoundError(`Error in getting notes.`);
  }

  res.status(StatusCodes.OK).json(note);
};

const getNote = async (req, res) => {
  const { id } = req.user;
  const { noteKey } = req.params;

  const note = await Note.getNote(id, noteKey);

  if (!note) {
    throw new NotFoundError(`Error in getting note.`);
  }

  res.status(StatusCodes.OK).json(note[0]);
};

module.exports = { createNote, updateNote, deleteNote, getAllNotes, getNote };
