const Router = require('express')
const router = new Router()
const orderController = require('../controller/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/add',authMiddleware(1), orderController.add)
router.post('/addition',orderController.addition)
router.put('/editing/:id_order',authMiddleware(1), orderController.editing)
router.put('/editingAll/:id_order',authMiddleware(1), orderController.editingAll)
router.delete('/deletion/:id_order',authMiddleware(1), orderController.delete)

module.exports = router