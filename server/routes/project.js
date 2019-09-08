
const router = require('express').Router()
const ProjectController = require('../controllers/project')
const { authentication, projectAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ProjectController.create)
router.get('/', ProjectController.getProjects)

router.use('/:id', projectAuthorization)
router.get('/:id', ProjectController.getProject) // belum terpakai
router.post('/:id', ProjectController.addMember)
router.delete('/:id', ProjectController.delete)

module.exports = router