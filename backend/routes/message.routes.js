const express = require("express");
const { authUserMiddleware } = require("../middlewares/auth.middleware");
const { sendMessage } = require("../controller/message.controller");

const router = express.Router();

router.route("/").post( authUserMiddleware ,sendMessage);
// router.route("/:id").get( authUserMiddleware ,getMessage);


module.exports = router;