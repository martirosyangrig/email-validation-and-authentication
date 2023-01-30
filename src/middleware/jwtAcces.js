const jwt = require("jsonwebtoken");

class UserAccess {

    static isLogIn(req, res, next) {

        const accessToken = req.coookie["access-token"]

        if(!accessToken) return res.redirect("/signin");

        const validUser = jwt.verify(accessToken, process.env.JWT_SECRET);

        res.user = validUser;
        next();

    }

    static chekLoged( req, res, next) {
        const accessToken = req.coookie["access-token"];

        if( !accessToken ) return next();

        res.redirect("/");
        return next();
    }
}

module.exports = UserAccess;