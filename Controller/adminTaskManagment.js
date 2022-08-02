const AsyncErrorHandler = require("../MiddleWare/asyncErrorHandler");
const ErrorHandler = require("../Utilities/errorHandler");
const userModel = require("../Model/userModel");

module.exports.GET_ALL_USER = AsyncErrorHandler(async (req, res, next) => {
    res.status(200).json({ status: true, userList:req.userList })
});

module.exports.SET_REMARKS = AsyncErrorHandler(async (req, res, next) => {
    let {taskId,remarks}= req.body
    remarks = remarks.trim()
    if(taskId||remarks){
        if(remarks.length>0){
            await userModel.updateOne(
                {
                    "task":{"$elemMatch":{"_id":taskId}}
                },
                {
                    "$set":
                    {
                        "task.$.remarks" :remarks,
                    }
                },
                {
                    runValidators:true
                }
            )
        return res.status(200).json({status:true,message:"Updated"})
        }
    }
    return next(new ErrorHandler("Please Provide All Detail",400))
});