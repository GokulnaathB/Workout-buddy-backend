const User = require("../models/userModel")
const jwt = require("jsonwebtoken") // On this we can use a method called sign to create and sign a token.

const createToken = (_id) => {
    // _id is going to be part of the payload of the token. 

   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
    // This method takes 3 arguments. The first one is an object which kind of represents the payload on the token we wanna create. 
    // _id is the same as _id: _id as the property's and the value's name is the same.
    // The 2nd argument is the secret string.
    // The 3rd argument is gonna be basically just some options. We'll set expiresIn property. When set to "3d", the user would remain logged in for 3 days and then the token is gonna expire.
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token}) // token is that big long string or rather those three separate strings bunched together (payload encoded, headers encoded, the secret encoded [as signature?])
        // We're sending this token back to the browser to say that was a success and now you're authenticated, you're automatically logged in after signing up. We basically authenticate them right away after signing up. We're gonna use this token in the frontend later on.
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}