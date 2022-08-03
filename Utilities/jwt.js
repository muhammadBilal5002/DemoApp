exports.JWT = (user,res)=>{
    const token = user.getJsonWebToken()
    const Option = {
        // httpOnly:true,
        expires: new Date(Date.now() + process.env.Expires_Cookies*24*60*60*1000),
      //   sameSite: 'None'
    }
        
    res.cookie("token",token,Option).status(200).json({status:true,user,token})
    
}
