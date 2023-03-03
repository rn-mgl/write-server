const controller = require("../controllers/allController");
const express = require("express");
const router = express.Router();

router.route("/").get(controller.getAllFiles);

module.exports = router;
