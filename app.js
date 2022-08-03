const express = require("express")
var cors = require('cors')
const app = express()
const http = require("http").createServer(app)
require("dotenv").config({path:"./Config/Env.env"})
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000


require("./Config/dbConfig")()
const server = http.listen(PORT,()=>{
    console.log("Server Started At PORT "+PORT)
})
app.use(
    cors({
        origin: true,
      credentials: true,
        optionsSuccessStatus: 200
    })
);

//uncaughtException
process.on("uncaughtException",(e)=>{
    console.log(`Error in Server ${e.message}`)
    console.log("Shutting Down The Server")
    server.close(()=>{
        process.exit(1)
    })
})

app.use(express.json())
app.use(cookieParser())
app.use((req,res,next)=>{
    
    req.mycookie = req.body.cookie
    next()

})
app.use("/api/userAuthentication",require("./Router/userRoute"))
app.use("/api/task",require("./Router/userTaskRoute"))
app.use("/api/adminmangment",require("./Router/adminTaskRoute"))
app.use(require("./MiddleWare/errorHandler.js"))


//unhandledRejection
process.on("unhandledRejection",(e)=>{
    console.log(`Error in Server ${e}`)
    console.log("Shutting Down The Server")
    server.close(()=>{
        process.exit(1)
    })
})
