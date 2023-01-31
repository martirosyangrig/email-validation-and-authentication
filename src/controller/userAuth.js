const User = require("../modules/userSchema");
const isEmailValid = require("../utils/isEmailValid")
const jwt = require("jsonwebtoken")
const {sendEmail} = require("../utils/nodemailer")


class UserAuth {

    static  async signUp(req, res) {

        const {email, password} = req.body;

        if(!email || !password) return res.status(402).json({message: "there is no email or password"});

        const { valid } = await isEmailValid(email);

        if ( !valid ) return res.status(404).json("Ther is not such an email");

        try {

            const user = new User({
                email,
                password,
                veryfied: false
            });

            const newUser = await user.save();
            
                const emailToken = jwt.sign({user}, "secret", {expiresIn: "1d"});
                const url = `http://localhost:3001/confirm/${emailToken}`

                sendEmail(newUser, url)
                 console.log("sent");
                    return res.redirect("/signin")
              
         
        } catch (error) {
            console.log(error)
        }

    }


    static async signIn(req , res ) {

        const {email,password} = req.body;

        try {
          
            const user = await User.findOne({email: email});
            
            if (!user || user.password !== password || !user.veryfied)  return res.status(404).json({message: "Invalid username"})
         
            const token = createToken(user.id);
            res.cookie("token", token); 
            res.send(user)

        } catch (error) {
            console.log(error);
        }

    }

    static logOut (req, res)  {
        res.clearCookie("token") 
        res.json({message: "you have been logged out"})
        res.redirect("/login")
    }
    
    static async verifyEmail(req, res) {
        try {

            const token = req.params.id;
            const veryfiedUser =  await jwt.verify(token, "secret");

            await User.findOneAndUpdate({email: veryfiedUser["user"]["email"]}, {veryfied: true});
            return res.redirect("/signin");

        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = UserAuth;