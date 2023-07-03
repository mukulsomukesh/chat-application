const express = require("express");
const { authUserMiddleware } = require("../middlewares/auth.middleware");
const { sendMessage, getMessages } = require("../controller/message.controller");

const router = express.Router();

router.route("/").post( authUserMiddleware ,sendMessage);
router.route("/:id").get( authUserMiddleware ,getMessages);


module.exports = router;