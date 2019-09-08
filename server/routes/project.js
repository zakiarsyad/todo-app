
const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ProjectController.create)
router.get('/', ProjectController.getProjects)
router.get('/:id', ProjectController.getProject)
router.post('/:id/', ProjectController.addMember)

module.exports = router