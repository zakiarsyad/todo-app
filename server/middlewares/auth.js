
const { verifyToken } = require('../helpers/jwt')
const Todo = require('../models/todo')
const Project = require('../models/project')

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

function projectAuthorization(req, res, next) {
    const projectId = req.params.id
    const userId = req.decode.id

    Project.findOne({ _id: projectId })
        .then(project => {
            if (project) {
                if (project.userId == userId) next()
                else next({ status: 403, message: `You are not authorized` })
            } else next({ status: 404, message: `Project id is invalid` })
        })
        .catch(err => {
            console.log(err)
            next
        })
}

module.exports = { authentication, authorization, projectAuthorization }