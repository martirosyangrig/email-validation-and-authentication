const express = require("express")
const router = express.Router();
const UserAuth = require("../controller/userAuth");
const UserAccess = require("../middleware/jwtAcces");



router.post("/signup", UserAccess.chekRegisteredEmail ,UserAuth.signUp);
router.post("/signin", UserAccess.chekLoged , UserAuth.signIn);
router.get("/logout", UserAuth.logOut);
router.get("/confirm/:id", UserAuth.verifyEmail);

router.get("/", UserAccess.isLogIn,  (req, res)=> {
    res.send("hello world");
});

module.exports = router;