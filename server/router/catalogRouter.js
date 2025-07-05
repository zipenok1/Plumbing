const Router = require('express')
const router = new Router()
const catalogController = require('../controller/catalogController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/receiving',catalogController.receiving)
router.post('/addition',authMiddleware(1), catalogController.addition)
router.put('/editing/:id_catalog',authMiddleware(1), catalogController.editing)

module.exports = router