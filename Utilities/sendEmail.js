var nodemailer = require('nodemailer')
exports.sendEmail = async (option)=>{ 
    
    var transport = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
          user: 'muhammadbilal5002@outlook.com',
          pass: 'dog2grass'
        }, 
    
      });
      var mailOptions = {
       from: 'muhammadbilal5002@outlook.com',
        to: option.email,
        subject: "Password Reset Requested For Your Account", 
        html: `<h1>Reset Password Link</h1>
               <p>${option.message}</p> `
      };

      await transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error)
        }else{
            console.log("Okay Hogyaa")
        }
        });

}