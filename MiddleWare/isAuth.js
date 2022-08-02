const AsyncErrorHandler = require("./asyncErrorHandler")
const JWT = require("jsonwebtoken")
const UserModel = require("../Model/userModel")
const ErrorHandler = require("../Utilities/errorHandler")

module.exports.IsAuth = AsyncErrorHandler( async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return  res.status(400).json({status:false,message:"Please Login To Access Resource"})
    }
    const decodevalue = await JWT.verify(token,process.env.SCECRETKEY)
    user = await UserModel.findById(decodevalue.id)    
    req.user = user
    next()
})

module.exports.CheckRoll = (...role)=>(req,res,next)=>{
    req.body.role = req.user.role  
    if(!role.includes(req.user.role)){
        return next(new ErrorHandler(`Role: "${req.body.role}" Can't Operate This Operation`),400)
    }
    next()
}
