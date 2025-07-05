const Router = require('express')
const router = new Router()
const cotologRouter = require('./catalogRouter')
const characterRouter = require('./characterRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')

router.use('/catalog', cotologRouter)
router.use('/character', characterRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)

module.exports = router