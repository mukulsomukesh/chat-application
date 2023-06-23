const express = require("express")

const app = express()


app.get("/",(req, res)=>{
    console.log("ok")
})


app.listen(8080, console.log("server is running"))