const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");

const app = express();
dotenv.config();
connectionDB()

app.get("/",(req, res)=>{
    console.log("ok");
})


app.listen(8080, console.log("server is running"));