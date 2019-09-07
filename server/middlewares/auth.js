
const { verifyToken } = require('../helpers/jwt')
const Todo = require('../models/todo')

function authentication(req, res, next) {
    const { token } = req.headers

    try {
        req.decode = verifyToken(token)
        next()
    } catch (err) { next({ status: 403, message: `Please login first` }) }
}

function authorization(req, res, next) {
    const todoId = req.params.id
    const userId = req.decode.id

    Todo.findOne({ _id: todoId })
        .then(todo => {
            if (todo) {
                if (todo.userId == userId) next()
                else next({ status: 403, message: `You are not authorized` })
            } else next({ status: 404, message: `Todo id is invalid` })
        })
        .catch(err => {
            console.log(err)
            next
        })
}

module.exports = { authentication, authorization }