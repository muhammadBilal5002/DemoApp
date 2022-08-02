const AsyncErrorHandler = require("./asyncErrorHandler")
const UserModel = require("../Model/userModel")

module.exports.UpdateMe = AsyncErrorHandler( async (req,res,next)=>{
    req.user.task.forEach((task)=>{
        if(Date.now() > task.deadline && task.status=="Pending"){
            task.status = "Uncompleted"
        }
    })
    req.user = await req.user.save()
    next()

})

module.exports.UpdateAllUser = AsyncErrorHandler( async (req,res,next)=>{
    let userList = await UserModel.find({role:{$ne:"Admin"}})
    userList.forEach((user)=>{
        user.task.forEach((task)=>{
            if(Date.now() > task.deadline && task.status=="Pending"){
                task.status = "Uncompleted"
            }
        })
        user.save()
    })
    req.userList = userList 
    next()
})