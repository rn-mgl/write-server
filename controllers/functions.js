const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const verifyPassword = async (candidatePassword, password) => {
  const isMatched = await bcrypt.compare(candidatePassword, password);
  return isMatched;
};

const createToken = (name, surname, email, userId) => {
  const token = jwt.sign({ name, surname, email, userId }, process.env.JWT_S, {
    expiresIn: process.env.JWT_TTL,
  });

  return token;
};

module.exports = { hashPassword, verifyPassword, createToken };
