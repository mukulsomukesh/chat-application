const express = require("express");
const { authUserMiddleware } = require("../middlewares/auth.middleware");
const { accessChat } = require("../controller/chat.controller");

const router = express.Router()

router.route("/").post(authUserMiddleware, accessChat)
// router.route("/").get(authUserMiddleware,)
// router.route("/group").post(authUserMiddleware, )
// router.route("/rename").post(authUserMiddleware, )
// router.route("/groupRemove").post(authUserMiddleware, )
// router.route("/groupAdd").post(authUserMiddleware, )

module.exports = router;