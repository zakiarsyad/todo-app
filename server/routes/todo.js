
const router = require('express').Router()
const TodoController = require('../controllers/todo')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', TodoController.getTodos)
router.post('/', TodoController.create)
router.get('/uncomplete', TodoController.getUncompleteTodos)
router.get('/completed', TodoController.getCompletedTodos)

router.use('/:id', authorization)
router.get('/:id', TodoController.getTodo)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.delete)

module.exports = router