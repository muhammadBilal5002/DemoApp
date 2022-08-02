const express = require("express")
const router = express.Router()
const {REGISTER_USER,LOGIN_USER,LOGOUT,RESET_PASSWORD_LINK,RESETTING} = require("../Controller/userAuthentication")

router.route("/Register").post(REGISTER_USER)
router.route("/Login").post(LOGIN_USER)
router.route("/Forgot").post(RESET_PASSWORD_LINK)
router.route("/Logout").post(LOGOUT)
router.route("/password/reset/:Link").get(RESETTING)


module.exports  = router