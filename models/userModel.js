const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static signup function.
// Right here, we don't have the User. We export it and use it elsewhere, but we really don't have it at the minute. When we create static methods, instead of using the model name, we can use the "this" keyword, it refers to the model essentially.

userSchema.statics.signup = async function (email, password) {

    // validation
    if(!email && !password)
    throw Error("All fields must be filled")

    if(!validator.isEmail(email) && !validator.isStrongPassword(password))
    throw Error("Make sure for your email is of the correct format and strong password")

    if(!validator.isEmail(email))
    throw Error("Email not valid")

    if(!validator.isStrongPassword(password))
    throw Error("Password not strong")

    const exists = await this.findOne({email})
    if(exists)
    throw Error("Email already in use")

    const salt = await bcrypt.genSalt(10 ) // This step takes time to complete by design. We pass in a number. The higher the number, the longer it will take for potential hackers to crack passwords. But also, it takes longer for users to signup as well. So, you need to find a balance. The default value is 10.

    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}

// Static login method
userSchema.statics.login = async function (email, password){
    if(!email || !password)
    throw Error("All fields must be filled")

    const user = await this.findOne({email})

    if(!user)
    throw Error("Incorrect email")

    const match = await bcrypt.compare(password, user.password) // returns true or false depending on whether they're the same or not

    if(!match)
    throw Error("Incorrect password")

    return user
}

module.exports = mongoose.model("User", userSchema)