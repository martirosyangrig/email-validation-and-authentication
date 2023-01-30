const express = require("express")
const router = express.Router();
const UserAuth = require("../controller/userAuth");
const UserAccess = require("../middleware/jwtAcces");
const nodemailer = require("nodemailer")

let mailTransporter = nodemailer.createTransport({
    service: "Mail.ru",
    auth: {
        user: "grigor.martirosyan2000@mail.ru",
        pass: "barc123123"
    }
})
let details = {
    from: "grigor.martirosyan2000@mail.ru",
    to: "detayi8357@brandoza.com",
    subject: "testing",
    text: "testing our"
}
router.post("/signup", UserAccess.chekRegisteredEmail ,UserAuth.signUp);
router.post("/signin", UserAccess.chekLoged , UserAuth.signIn)
router.get("/logout", UserAuth.logOut);

router.post("/send", (req, res) => {
    mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log("it has eror", err);
        }else{
            console.log("senting");
        }
    })
})
router.get("/", UserAccess.isLogIn,  (req, res)=> {
    res.send("hello world")
});

module.exports = router;