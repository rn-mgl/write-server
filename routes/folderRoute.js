const controller = require("../controllers/folderController");
const express = require("express");
const router = express.Router();

router.route("/").post(controller.createFolder).get(controller.getAllFolders);
router
  .route("/:folderKey")
  .patch(controller.updateName)
  .delete(controller.deleteFolder)
  .get(controller.getFolder);

module.exports = router;
