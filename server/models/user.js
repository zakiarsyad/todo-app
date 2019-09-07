
const mongoose = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, `email is required`],
        validate: {
            validator: function (value) {
                const emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return emailPattern.test(value)
            },
            message: `invalid email format`
        }
    },
    password: {
        type: String,
        required: [true, `password is required`]
    }
}, { timestamps: { createdAt: 'created_at' } })

userSchema.path('email').validate(function (value) {
    return this.model('User').findOne({ email: value })
        .then(found => {
            if (found) return false
            else return true
        })
}, `email is already registered`)

userSchema.pre('save', function (next) {
    this.password = hashPassword(this.password)
    next()
})

module.exports = mongoose.model('User', userSchema)