const UnauthenticatedError = require("../errors/unauthenticatedError");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new UnauthenticatedError(`Log in first before doing this process.`);
  }

  const token = header.split(" ")[1];

  const { name } = jwt.verify(token, process.env.JWT_S);

  req.user = { id: name.userId, name: name.name, email: name.email };

  next();
};

module.exports = authMiddleware;
