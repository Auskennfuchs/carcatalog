import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    password: { type: String, required: true },
})

UserSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(saltRounds).then(salt => {
        bcrypt.hash(user.password, salt)
            .then(hash => {
                user.password = hash
                next()
            })
            .catch(err => next(err))
    })
})

UserSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            email: this.email,
            name: this.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 60*60,
        }
    )
}

UserSchema.methods.toAuthJSON = function () {
    return {
        email: this.email,
        name: this.name,
        firstName: this.firstName,
        jwt: this.generateJWT(),
    }
}

UserSchema.plugin(uniqueValidator, { message: "User already exists" })

export default mongoose.model("User", UserSchema)