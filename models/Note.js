const db = require("../db/connect");

class Note {
  constructor(noteKey, owner, name, path, content) {
    this.noteKey = noteKey;
    this.owner = owner;
    this.name = name;
    this.path = path;
    this.content = content;
  }

  async createNote() {
    try {
      const sql = `INSERT INTO notes SET ?;`;
      const insertValues = {
        noteKey: this.noteKey,
        owner: this.owner,
        name: this.name,
        path: this.path,
        content: this.content,
      };

      const [data, _] = await db.query(sql, insertValues);

      return data;
    } catch (error) {
      console.log(error + "   create note   ");
    }
  }

  static async updateNote(name, content, noteKey) {
    try {
      const sql = `UPDATE notes SET ?
                  WHERE noteKey = '${noteKey}';`;
      const updateValues = { name, content };

      const [data, _] = await db.query(sql, updateValues);

      return data;
    } catch (error) {
      console.log(error + "   update content   ");
    }
  }

  static async deleteNote(noteKey) {
    try {
      const sql = `DELETE FROM notes
                    WHERE noteKey = '${noteKey}';`;

      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error + "   delete note   ");
    }
  }

  static async deleteNoteByPath(path) {
    try {
      const sql = `DELETE FROM notes
                    WHERE path = '${path}';`;

      const [data, _] = await db.execute(sql);

      return data;
    } catch (error) {
      console.log(error + "   delete note   ");
    }
  }

  static async getAllNotes(userId, path) {
    try {
      const sql = `SELECT * FROM notes 
                    WHERE owner = '${userId}' AND path = '${path}'
                    ORDER BY dateCreated DESC;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "   get all notes   ");
    }
  }

  static async getNote(userId, noteKey) {
    try {
      const sql = `SELECT * FROM notes 
                WHERE noteKey = '${noteKey}' AND owner = '${userId}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "   get all notes   ");
    }
  }

  static async moveNote(userId, noteKey, path) {
    try {
      const sql = `UPDATE notes SET ?;`;
      const updateValues = { userId, noteKey, path };
      const [data, _] = await db.query(sql, updateValues);
      return data;
    } catch (error) {
      console.log(error + "   get all notes   ");
    }
  }

  static async updateNoteColor(noteKey, noteColor) {
    try {
      const sql = `UPDATE notes SET ? 
                  WHERE noteKey = '${noteKey}'`;
      const updateValues = { noteColor };

      const [data, _] = await db.query(sql, updateValues);
      return data;
    } catch (error) {
      console.log(error + "   update note color   ");
    }
  }

  static async updateTextColor(noteKey, textColor) {
    try {
      const sql = `UPDATE notes SET ? 
                  WHERE noteKey = '${noteKey}'`;
      const updateValues = { textColor };

      const [data, _] = await db.query(sql, updateValues);
      return data;
    } catch (error) {
      console.log(error + "   update note color   ");
    }
  }
}

module.exports = Note;
