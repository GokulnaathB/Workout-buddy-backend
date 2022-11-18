const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
    // We invoke the next function to move on to the next piece of middleware or the next handler once this middleware has run.

    // Verify that the user is authenticated.
    const {authorization} = req.headers

    if(!authorization)
    return res.status(400).json({error: "Authorization token required"})

    // Get the token from authorization because we send the token as a part of that request header.
    // Value of authorization when we send it is gonna be a string "Bearer akhsdhfsh.adjhdkds.237iewhdhm"

    const token = authorization.split(" ")[1]
    // Now we need to verify that this token hasn't been tampered with. To do this, we need to use the JSON web token package.

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        // It verifies it for us and it returns us the token or the payload from that token. We can grab the id from that payload.
        // If there's an error, if it can't verify that, then we catch the error.

        // We'll use the id from the payload to try and find this user in the database.
        req.user = await User.findOne({_id}).select("_id")  // Attaching the user property to the request object so that when we go on to the next piece of middleware, one of those workout handler functions, on the request object in those functions, we're gonna have the user property because this function runs first.
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth