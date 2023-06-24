const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
const userRoutes = require("./routes/user.routes")

const app = express();
dotenv.config();
connectionDB();

app.use(express.json());

app.get("/",(req, res)=>{
    console.log("ok");
})

app.use("/api/user", userRoutes)


app.listen(8080, console.log("server is running"));