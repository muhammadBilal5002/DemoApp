const ErrorHandler = require("../Utilities/errorHandler")
module.exports = (err,req,res,next) =>{

    err.statusCode = err.statusCode ||500
    err.message = err.message || "Internal Server Error"
    
    if(err.name == "CastError"){
        err = new ErrorHandler("CastError => "+err.path,400) 
    }
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} Already Exist`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        status:false,
        message: err.message,
    })
}