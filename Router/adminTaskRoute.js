const express = require("express")
const router = express.Router()
const {IsAuth,CheckRoll} = require("../MiddleWare/isAuth")
const {UpdateAllUser} = require("../MiddleWare/UpdateUser")


const {GET_ALL_USER,SET_REMARKS} = require("../Controller/adminTaskManagment")

router.route("/GetAllUser").post(IsAuth,CheckRoll("Admin"),UpdateAllUser,GET_ALL_USER)
router.route("/SetRemarks").post(IsAuth,CheckRoll("Admin"),UpdateAllUser,SET_REMARKS)

module.exports  = router