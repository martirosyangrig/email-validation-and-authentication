const jwt = require("jsonwebtoken");

class UserAccess {

    static isLogIn(req, res, next) {

        const accessToken = req.coookie["access-token"]

        if(!accessToken) return next();

        const validUser = jwt.verify(accessToken, process.env.JWT_SECRET);


    }
}

module.exports = UserAccess;