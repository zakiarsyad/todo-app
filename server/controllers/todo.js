
const Todo = require('../models/todo')

class TodoController {
    static create(req, res, next) {
        const { name, description, due_date } = req.body
        const userId = req.decode.id

        Todo.create({ name, description, due_date, userId })
            .then(todo => {
                res.status(201).json({
                    message: `success create a todo`,
                    todo
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static getTodos(req, res, next) {
        const userId = req.decode.id

        Todo.find({ userId })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static getTodo(req, res, next) {
        const { id } = req.params

        Todo.findById(id)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static updateStatus(req, res, next) {
        const { id } = req.params

        Todo.updateOne({ _id: id },
            { status: "completed" })
            .then(changes => {
                res.status(200).json({
                    message: `success update status`,
                    changes
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static delete(req, res, next) {
        const { id } = req.params

        Todo.deleteOne({ _id: id })
            .then(changes => {
                res.status(200).json({
                    message: `success delete a todo`,
                    changes
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static getUncompleteTodos(req, res, next) {
        const userId = req.decode.id

        Todo.find({ status: "uncomplete", userId })
            .then(uncompleteTodos => {
                res.status(200).json(uncompleteTodos)
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static getCompletedTodos(req, res, next) {
        const userId = req.decode.id

        Todo.find({ status: "completed", userId })
            .then(completedTodos => {
                res.status(200).json(completedTodos)
            })
            .catch(err => {
                console.log(err)
                next
            })
    }
}

module.exports = TodoController