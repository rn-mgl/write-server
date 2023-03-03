require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");

const allRouter = require("./routes/allRoute");
const authRouter = require("./routes/authRoute");
const noteRouter = require("./routes/noteRoute");
const folderRouter = require("./routes/folderRoute");

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use("/auth", authRouter);
app.use("/all", authMiddleware, allRouter);
app.use("/note", authMiddleware, noteRouter);
app.use("/folder", authMiddleware, folderRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
