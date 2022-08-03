exports.JWT = (user,res)=>{
    const token = user.getJsonWebToken()
    const Option = {
        // httpOnly:true,
        expires: new Date(Date.now() + process.env.Expires_Cookies*24*60*60*1000),
         sameSite: 'None'
    }
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Expose-Headers','date, etag, access-control-allow-origin, access-control-allow-credentials');
        
    res.cookie("token",token,Option).status(200).json({status:true,user,token})
    
}
