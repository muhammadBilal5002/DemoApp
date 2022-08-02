const AsyncErrorHandler = require("../MiddleWare/asyncErrorHandler");
const ErrorHandler = require("../Utilities/errorHandler");
const userModel = require("../Model/userModel");

module.exports.CREATE_TASK = AsyncErrorHandler(async (req, res, next) => {

    const { title, detail, description, priority, deadline } = req.body
    let user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { task: { title, detail, description, priority, deadline } } },
        { new: true, runValidators: true }
    )
    let status = "Pending" 
    if(Date.now()>new Date(deadline)){
        status = "Uncompleted"
    }
    let task = user.task[user.task.length -1]
    task.status = status     
    res.status(200).json({ status: true, message: "Task Created", task})
});

module.exports.DELETE_TASK = AsyncErrorHandler(async (req, res, next) => {

    const { taskId } = req.body
    let user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        { $pull: { task: { _id: taskId } } },
        { new: true, runValidators: true }
    )
    res.status(200).json({ status: true, message: "Task Deleted", task: user.task })
});

module.exports.GET_MY_TASK = AsyncErrorHandler(async (req, res, next) => {
    res.status(200).json({ status: true, message: "All Task", task: user.task })
});


module.exports.UPDATE_TASK = AsyncErrorHandler(async (req, res, next) => {
    // const {title, detail, description, priority, deadline,status ,taskId} = req.body
    const {taskId,status} = req.body

    let allow = false
    let user = req.user
    user.task.forEach((task) => {
        if(task._id.toString()==taskId.toString()){
            if(task.status=="Pending"){
                allow = true
                return
            }
        }
    });
    console.log(taskId+" "+status)
    console.log(allow)
    if(allow){    
    let result = await userModel.updateOne(
        {
            "_id":req.user._id,
            "task":{"$elemMatch":{"_id":taskId}}
        },
        {
            "$set":
            {
                // "task.$.title" :title,
                // "task.$.detail" :detail,
                // "task.$.description" :description,
                // "task.$.priority" :priority,
                // "task.$.deadline" :deadline,
                "task.$.status" :status
            }
        },
        {
            runValidators:true
        }
        );
        return res.status(200).json({ status: true, message: "Task Updated",result})
    }
    return res.status(400).json({ status: false, message: "Task Cant Be Update"}) 
    
});