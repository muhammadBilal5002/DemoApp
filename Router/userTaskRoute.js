const express = require("express")
const router = express.Router()
const {IsAuth} = require("../MiddleWare/isAuth")
const {UpdateMe} = require("../MiddleWare/UpdateUser")

const {CREATE_TASK,GET_MY_TASK,UPDATE_TASK,DELETE_TASK} = require("../Controller/taskCRUD")

router.route("/create").post(IsAuth,CREATE_TASK)
router.route("/getmytask").post(IsAuth,UpdateMe,GET_MY_TASK)
router.route("/updatetask").post(IsAuth,UpdateMe,UPDATE_TASK)
router.route("/deletetask").post(IsAuth,DELETE_TASK)

module.exports  = router