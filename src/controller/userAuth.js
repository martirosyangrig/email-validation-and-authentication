const User = require("../modules/userSchema");
const isEmailValid = require("../utils/isEmailValid")
const createToken = require("../utils/createUserToken")
const crypto = require("crypto")

const transporter = require("../utils/nodemailer")


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
                emailToken: crypto.randomBytes(64).toString("hex"),
                veryfied: false
            });

            const newUser = await user.save();

        //     const mailOptions = {
        //         from: `"Veryfy your email" <grigorgrigor055@gmail.com>`,
        //         to: user.email,
        //         subject: "codewithsid -veryfy your email",
        //         html: `<h2> thanks for ragister</h2>
        //             <h4> Please verify your email to continue</h4>
        //             <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify</a>`
        //     }

        //    await  transporter.sendMail(mailOptions, (err, info) => {
        //         if(err) {
        //             console.log(err);
        //         }else{
        //             console.log("email has sent");
        //         }
        //     })
        //     res.json(newUser);
         
        } catch (error) {
            console.log(error)
        }

    }

    static async signIn(req , res ) {

        const {email,password} = req.body;

        try {
          
            const user = await User.findOne({email: email});
            
            if (!user || user.password !== password)  return res.status(404).json({message: "Invalid username"})
         
            const token = createToken(user.id)
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
}

module.exports = UserAuth;