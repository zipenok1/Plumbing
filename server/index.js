require('dotenv').config();
const express = require('express')
const sequelize = require('./db')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const router = require('./router/index')
const models = require('./models/models')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(5000, () => {console.log('сервер запущен');})
    } catch (e) {
        console.log(e);
    }
}
start()