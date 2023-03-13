const db = require("../db/connect");

class Folder {
  constructor(folderKey, owner, name, path) {
    this.folderKey = folderKey;
    this.owner = owner;
    this.name = name;
    this.path = path;
  }

  async createFolder() {
    try {
      const sql = `INSERT INTO folders SET ?;`;
      const insertValues = {
        folderKey: this.folderKey,
        owner: this.owner,
        name: this.name,
        path: this.path,
      };

      const [data, _] = await db.query(sql, insertValues);

      return data;
    } catch (error) {
      console.log(error + "   create folder   ");
    }
  }

  static async updateName(folderKey, name) {
    try {
      const sql = `UPDATE folders SET ?
                  WHERE folderKey = '${folderKey}';`;
      const updateValues = { name };

      const [data, _] = await db.query(sql, updateValues);

      return data;
    } catch (error) {
      console.log(error + "   update name   ");
    }
  }

  static async deleteFolder(folderKey) {
    try {
      const sqlFolder = `DELETE FROM folders
                    WHERE folderKey = '${folderKey}';`;

      const sqlNote = `DELETE FROM notes 
                      WHERE path = '${folderKey}'`;

      const [dataFolder, _1] = await db.execute(sqlFolder);
      const [dataNote, _2] = await db.execute(sqlNote);

      return { dataFolder, dataNote };
    } catch (error) {
      console.log(error + "   delete folder   ");
    }
  }

  static async getAllFolders(userId, path) {
    try {
      const sql = `SELECT * FROM folders 
                    WHERE owner = '${userId}' AND path = ${path}
                    ORDER BY dateCreated DESC;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "   get all folders   ");
    }
  }

  static async getFolder(userId, folderKey) {
    try {
      const sql1 = `SELECT folderId AS fileId, folderKey AS fileKey, owner, name, path, folderColor AS bgColor, textColor, NULL AS content, "folder" as type, dateCreated FROM folders
                     WHERE owner = '${userId}' AND path = '${folderKey}'
                     
                     UNION 
                     
                     SELECT noteId AS fileId, noteKey AS fileKey, owner, name, path, noteColor AS bgColor, textColor, content, "note" as type, dateCreated FROM notes
                     WHERE owner = '${userId}' AND path = '${folderKey}'
                     
                     ORDER BY dateCreated DESC;`;
      const sql2 = `SELECT * FROM folders WHERE owner = '${userId}' AND folderKey = '${folderKey}';`;
      const [files, _1] = await db.execute(sql1);
      const [folder, _2] = await db.execute(sql2);
      return { files, folder };
    } catch (error) {
      console.log(error + "   get all folders   ");
    }
  }

  static async updateFolderColor(folderKey, folderColor) {
    try {
      const sql = `UPDATE folders SET ? 
                  WHERE folderKey = '${folderKey}'`;
      const updateValues = { folderColor };

      const [data, _] = await db.query(sql, updateValues);
      return data;
    } catch (error) {
      console.log(error + "   update folder color   ");
    }
  }

  static async updateTextColor(folderKey, textColor) {
    try {
      const sql = `UPDATE folders SET ? 
                  WHERE folderKey = '${folderKey}'`;
      const updateValues = { textColor };

      const [data, _] = await db.query(sql, updateValues);
      return data;
    } catch (error) {
      console.log(error + "   update folder color   ");
    }
  }
}

module.exports = Folder;
