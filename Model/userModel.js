const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const crypto = require("crypto")
const {userPriority,userStauts,userRole} = require("../Utilities/enum")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
        trim: true,
        maxLength: [30, "Name Cant Be Longer Than 30"],
        minLength: [4, "Name Length Cant Be Less Than 4"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        trim: true,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [7, "Password Length Must Be Length of 7"],
        select:false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    task:[
        {
            title:{
                type:String,
                required:[true,"Please Ensert Title"],
                maxlength:[35,"Title lenght must be less 35 char"]    
            },
            detail:{
                type:String,
                required:[true,"Please Insert Detail"],
                maxlength:[150,"Task Detail length must be less 150 char"]    
            },
            description:{
                type:String,
                required:[true,"Please Insert Detail"],
                maxlength:[500,"Task Detail length must be less 500 char"]    
            },
            priority:{
                type:String,
                required:[true,"Please Enter Proprity Level"],
                enum:userPriority
            },
            deadline:{
                type: Date,
                required:[true,"Please Select Deadline Date"],
            },
            remarks:{
                type:String,
                maxlength:[300,"Task Remarks length must be less 500 char"]    
            },
            status:{
                type:String,
                required:[true,"Please Select Status"],
                enum:userStauts,
                default:"Pending"
            }
        }
    ],
    role: {
        type: String,
        enum:userRole,
        default: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")){
    next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

UserSchema.methods.getJsonWebToken = function (){
    return JWT.sign({id:this._id},process.env.SCECRETKEY,{expiresIn:process.env.EXPIREIN})
}

UserSchema.methods.compare = async  function(checkPassword){
    return await bcrypt.compare(checkPassword,this.password)
}

UserSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex")    
    this.resetPasswordToken = crypto    
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model("User",UserSchema)