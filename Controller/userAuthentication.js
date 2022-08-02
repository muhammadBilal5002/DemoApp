const UserModel = require("../Model/userModel")
const AsyncErrorHandler = require("../MiddleWare/asyncErrorHandler");
const { JWT } = require("../Utilities/jwt");
const {sendEmail} = require("../Utilities/sendEmail");
const ErrorHandler = require("../Utilities/errorHandler");

module.exports.REGISTER_USER = AsyncErrorHandler (async (req,res,next)=>{ 
    const {name,email,password} = req.body
    const  avatar = {
        public_id:"Sample",
        url:"Sample"
    }
    const result = await UserModel.create({name,email:email.toLowerCase(),password,avatar})
    JWT(result,res)
});

module.exports.LOGIN_USER = AsyncErrorHandler (async (req,res,next)=>{ 
    const {email,password} = req.body
    if(!email || !password){
        return next(new ErrorHandler("Please Enter All Field",400))
    }
    const result = await UserModel.findOne({email:email.toLowerCase()}).select("+password")

    if(!result){
        return next(new ErrorHandler("Invalid Email or Password",400))
    }
    const isPassword = await result.compare(password) 
    if(!isPassword){
        return next(new ErrorHandler("Invalid Email or Password",400))
    }
    JWT(result,res)
});

module.exports.LOGOUT = AsyncErrorHandler( async (req,res,next)=>{
    res.cookie("token",null,
    {
        httpOnly:true,
        expires:new Date(Date.now())
    }
    )
    res.status(200).json({status:false,message:"LOGOUT"})
}
)


module.exports.RESET_PASSWORD_LINK = AsyncErrorHandler( async (req,res,next)=>{
    const {email} = req.body
    if(!email){
        return next(new ErrorHandler("Please Enter Email To Reset Password",400))
    }
    const user = await UserModel.findOne({email:email.toLowerCase()})
    if(!user){
        return next(new ErrorHandler("Email Address Is Wrong",500))
    }
    const resetToken = await user.getResetPasswordToken()
    
    await user.save({validateBeforeSave:false})
    
    const ResetLink = `${req.protocol}://${req.get("host")}/api/userAuthentication/password/reset/${resetToken}`
    
    message = `${ResetLink}`
    try {
        await sendEmail({
            email: user.email,
            subject:"RESET PASSWORD LINK",
            message
        })
        return res.status(200).json({statusbar:true,message:"Link Sent You By Email"})
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error,500))
    }

})

module.exports.RESETTING = AsyncErrorHandler( async (req,res,next)=>{
    console.log(req.params)
    res.status(200).json({status:true,message:"Password Reseted"})
})