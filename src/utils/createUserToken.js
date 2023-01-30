const jwt = require("jsonwebtoken")

const createToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET)
}

module.exports = createToken;