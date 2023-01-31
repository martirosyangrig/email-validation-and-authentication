const jwt = require("jsonwebtoken");
const User = require("../modules/userSchema");

class UserAccess {

    static async isLogIn(req, res, next) {
        const accessToken = req.cookies["token"]

        if(!accessToken) return res.status(403).json({message: "Accsess denied, pls log in"});

        const validUser = await jwt.verify(accessToken, process.env.JWT_SECRET);
        
        res.user = validUser;
        next();

    }

    static chekLoged( req, res, next) {

        const accessToken = req.cookies["token"];

        if( !accessToken ) return next();

        res.json({message: "You have already signed in"});

        return next();
    }

    static async chekRegisteredEmail(req, res, next) {

        const { email } = req.body;

        try {
            const user = await User.findOne({email: email});

            if (!user) return next();

            res.status(404).json({message: "This email is already used"})

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserAccess;