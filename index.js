const express = require("express");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const UserRouter = require("./src/routes/userSingup")
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/", UserRouter)



mongoose
.connect("mongodb+srv://admin:admin@cluster0.b30j5kf.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3001)
    console.log("everything is fine")
})
.catch(err => {
    console.log("smth went wrong");
})