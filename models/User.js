const db = require("../db/connect");

class User {
  constructor(email, name, surname, password) {
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.password = password;
  }

  async createUser() {
    try {
      const sql = `INSERT INTO users SET ?;`;

      const insertValues = {
        email: this.email,
        name: this.name,
        surname: this.surname,
        password: this.password,
      };

      const [data, _] = await db.query(sql, insertValues);

      return data;
    } catch (error) {
      console.log(error + "   create user   ");
    }
  }

  static async getByEmail(email) {
    try {
      const sql = `SELECT * FROM users
              WHERE email = '${email}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "   get by email   ");
    }
  }

  static async verifyUser(userId) {
    try {
      const sql = `UPDATE users SET ?
                  WHERE userId = '${userId}';`;
      const updateValues = { isVerified: 1 };

      const [data, _] = await db.query(sql, updateValues);

      return data;
    } catch (error) {
      console.log(error + "   verify user   ");
    }
  }
}

module.exports = User;
