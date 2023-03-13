const db = require("../db/connect");

class All {
  constructor() {}

  static async getAllFiles(owner) {
    try {
      const sql = `SELECT folderId AS fileId, folderKey AS fileKey, owner, name, path, folderColor AS bgColor, textColor, NULL AS content, "folder" as type, dateCreated FROM folders
                     WHERE owner = '${owner}' AND path = '0'
                     
                     UNION 
                     
                     SELECT noteId AS fileId, noteKey AS fileKey, owner, name, path, noteColor AS bgColor, textColor, content, "note" as type, dateCreated FROM notes
                     WHERE owner = '${owner}' AND path = '0'
                     
                     ORDER BY dateCreated DESC;`;

      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "   get all files   ");
    }
  }
}

module.exports = All;
