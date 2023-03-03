const controller = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.route("/s").post(controller.signUp);
router.route("/l").post(controller.logIn);
router.route("/v/:token").patch(controller.verify);

module.exports = router;
