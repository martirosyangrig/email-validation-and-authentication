
const createToken = (user) => {
    return jwt.sign(user, JWT_SECRET)
}

module.exports = createToken;