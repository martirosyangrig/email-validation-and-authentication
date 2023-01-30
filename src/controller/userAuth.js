const User = require("../modules/userSchema");
const emailValidator = require('deep-email-validator');
const createToken = require("../utils/createUserToken")

async function isEmailValid(email) {
  return emailValidator.validate(email)
}

class UserAuth {

    static  async signup(req, res) {

        const {email, password} = req.body;

        if(!email || !password) return res.json({message: "there is no email or password"});

        const { valid } = await isEmailValid(email);

        if ( !valid ) return res.status(404).json("Ther is not such an email");


        try {
            const user = new User({
                email,
                password,
                veryfied: false
            });

            const newUser = await user.save();
            res.json(newUser)
         
            
        } catch (error) {
            
        }

    }

    static async login(req , res ) {

        try {
            const {email, password} = req.body;
            const user = await User.findOne({email: email});

            if(!user || user.password !== password) return res.status(404).json({message: "Invalid  email"});

            const token = createToken(user)
            res.cookie("access-token", token)
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserAuth;