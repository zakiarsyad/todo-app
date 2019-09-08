
const router = require('express').Router()
const userRouter = require('./user')
const todoRouter = require('./todo')
const projectRouter = require('./project')

router.get('/', (req, res) => {
    res.status(200).json({
        message: `App is running. . .`
    })
})

router.use('/users', userRouter)
router.use('/todos', todoRouter)
router.use('/projects', projectRouter)

module.exports = router