const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name is Required'],
        trim: true
    },
    email: {
        type: String,
        required: [true,'Email is Required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }
        }
    },
    phone: {
        type: Number,
        required: [true, 'Please Enter Phone Number'],
        unique: true,
        trim: true,
        validate: [/^\d{10}$/, 'Please Enter a Valid Phone No.']
    },
    dateOfBirth: {
        type: String,
        required: [true,'Date of Birth is Required'],
        trim: true,
        validate(value) {
            if (!validator.isDate(value, { format: 'DD/MM/YYYY', strictMode: true })) {
                throw new Error('Date of Birth is Invalid.Format - DD/MM/YYYY')
            }
        }
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlength: [8,'Minimum Length is 8'],
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.__v
    return userObject
}

//Generating auth tokens and Storing in Database
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7 days" })
    
    // Saving Tokens in DataBase
    this.tokens = this.tokens.concat({ token })
    await this.save()

    return token
}

//Login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('Unable To Login')
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        throw new Error('Unable to Login')
    }

    return user;
}

//Hash The Plain text Password Before Saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)

    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
