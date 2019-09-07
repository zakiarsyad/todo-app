
const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { hashPassword, compareHash } = require('../helpers/bcryptjs')
const { OAuth2Client } = require('google-auth-library')

const clientId = process.env.GOOGLE_CLIENT_ID
const defaultPassword = process.env.DEFAULT_PASSWORD
const client = new OAuth2Client(clientId)

class UserController {
    static register(req, res, next) {
        let { email, password } = req.body

        User.create({ email, password })
            .then(user => {
                const payload = {
                    id: user.id,
                    email
                }

                const appToken = generateToken(payload)

                res.status(201).json({
                    message: `success create a user`,
                    user: { _id: user._id, email: user.email },
                    appToken
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(user => {
                if (user) {
                    if (compareHash(password, user.password)) {
                        const payload = {
                            id: user._id,
                            email
                        }

                        const appToken = generateToken(payload)

                        res.status(200).json({
                            message: `login success`,
                            appToken
                        })
                    } else next({
                        status: 403,
                        message: `Invalid username / password`
                    })
                } else next({
                    status: 403,
                    message: `Invalid username / password`
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static oAuth(req, res, next) {
        const { token } = req.body
        let payload

        client.verifyIdToken({
            idToken: token,
            audience: clientId
        })
            .then(ticket => {
                payload = ticket.getPayload()

                return User.findOne({ email: payload.email })
            })
            .then(user => {
                if (user) {
                    console.log(`user already registered`)
                    return user
                } else {
                    console.log(`user not registered yet`)

                    return User.create({
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(user => {
                const appToken = generateToken({
                    id: user._id,
                    email: payload.email
                })

                res.status(200).json({
                    message: `login via OAuth success`,
                    appToken
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }
}

module.exports = UserController