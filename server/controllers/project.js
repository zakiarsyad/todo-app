
const Project = require('../models/project')
const User = require('../models/user')

class ProjectController {
    static create(req, res, next) {
        const { name } = req.body
        const userId = req.decode.id

        Project.create({ name, userId })
            .then(project => {
                res.status(201).json({
                    message: `success create a project`,
                    project
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static addMember(req, res, next) {
        console.log('asjdlakjdlakdjlaj');
        const { id } = req.params
        const { email } = req.body

        User.findOne({ email })
            .then(user => {
                if (!user) next({ status: 404, message: `user not found` })

                return Project.updateOne({ _id: id },
                    { $push: { userId: user._id } })
            })
            .then(changes => {
                res.status(200).json({
                    message: `success add a member`,
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

        Project.deleteOne({ _id: id })
            .then(changes => {
                res.status(200).json({
                    message: `success delete a project`,
                    changes
                })
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static getProjects(req, res, next) {
        const userId = req.decode.id

        Project.find({ userId: { $in: userId } })
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                console.log(err)
                next
            })
    }

    static getProject(req, res, next) {
        const { id } = req.params

        Project.findById(id).populate('userId', 'email')
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(err => {
                console.log(err)
                next
            })
    }
}

module.exports = ProjectController