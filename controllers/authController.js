const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const { hashPassword, verifyPassword, createToken } = require("./functions");
const { sendMail } = require("./emailController");

const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, name, surname, password } = req.body;

  const hashedPass = await hashPassword(password);

  const user = new User(email, name, surname, hashedPass);

  const newUser = await user.createUser();

  if (!newUser) {
    throw new BadRequestError(`Error in signing up try again later.`);
  }

  const token = createToken(name, surname, email, newUser.insertId);

  res.status(StatusCodes.CREATED).json({ name, email, userId: newUser.insertId, token });

  const verification = await sendMail(email, name);

  if (!verification) {
    throw new BadRequestError(`Error in sending verification code.`);
  }
};

const logIn = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const user = await User.getByEmail(candidateEmail);

  if (!user) {
    throw new NotFoundError(`There is no user with the email ${candidateEmail}.`);
  }

  const { userId, name, surname, email, password, isVerified } = user[0];

  const isMatched = await verifyPassword(candidatePassword, password);

  if (!isMatched) {
    throw new BadRequestError(`The password and email does not match.`);
  }

  const token = createToken({ name, surname, email, userId });

  res.status(StatusCodes.CREATED).json({ name, email, userId, token, isVerified });
};

const verify = async (req, res) => {
  const { token } = req.params;

  const decode = jwt.verify(token, process.env.JWT_S);

  if (!decode) {
    throw new UnauthenticatedError(`Please use a legitimate account.`);
  }

  const updateUser = await User.verifyUser(decode.userId);

  if (!updateUser) {
    throw new BadRequestError(`Error in verifying your account.`);
  }

  res.status(StatusCodes.OK).json(updateUser);
};

module.exports = { signUp, logIn, verify };
