const express = require("express");
const { authUserMiddleware } = require("../middlewares/auth.middleware");
const { accessChat, getChats, createGroupChat, renameGroup } = require("../controller/chat.controller");

const router = express.Router()

router.route("/").post(authUserMiddleware, accessChat)
router.route("/").get(authUserMiddleware,getChats)
router.route("/group").post(authUserMiddleware, createGroupChat)
router.route("/rename").put(authUserMiddleware, renameGroup)
// router.route("/groupRemove").post(authUserMiddleware, )
// router.route("/groupAdd").post(authUserMiddleware, )

module.exports = router;