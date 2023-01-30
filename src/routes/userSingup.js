const express = require("express")
const router = express.Router();
const UserAuth = require("../controller/userAuth");
const UserAccess = require("../middleware/jwtAcces");

router.post("/signup", UserAuth.signup);


router.get("/", UserAccess.isLogIn , (req, res)=> {
    res.send("hello world")
})
module.exports = router