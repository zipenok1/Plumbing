const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) =>{
    return jwt.sign(
        {id, email, role},
        process.env.SEKRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal('пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('пароль не найден'))
        }
        const token = generateJwt(user.id_user, user.email, user.id_role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id_user, req.user.email, req.user.id_role)
        return res.json({token})
    }   
}
module.exports = new UserController()