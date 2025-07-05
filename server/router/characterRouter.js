const Router = require('express')
const router = new Router()
const characterController = require('../controller/characterController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/receiving/:id_catalog', characterController.receiving)
router.get('/add', characterController.add)
router.post('/addition',authMiddleware(1), characterController.addition)
router.put('/editing/:id_character',authMiddleware(1), characterController.editing)
router.delete('/deletion/:id_character',authMiddleware(1), characterController.delete)

module.exports = router