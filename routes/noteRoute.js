const controller = require("../controllers/noteController");
const express = require("express");
const router = express.Router();

router.route("/").post(controller.createNote).get(controller.getAllNotes);
router
  .route("/:noteKey")
  .patch(controller.updateNote)
  .delete(controller.deleteNote)
  .get(controller.getNote);

module.exports = router;
