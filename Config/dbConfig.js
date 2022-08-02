module.exports = ()=>{
        require("mongoose").connect(process.env.MONGODB).then(()=>{
            console.log("Connected DB")
        })
}