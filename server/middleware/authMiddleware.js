const jwt = require('jsonwebtoken')

module.exports = function (role){
    return function (req, res , next){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                res.status(401).json({message:'не авторизован'})
            }
            const decode = jwt.verify(token, process.env.SEKRET_KEY)
            if(decode.role !== role){
                res.status(403).json({message:'нет доступа'})
            }
            req.user = decode
            next()
        } catch(e){
            res.status(401).json({message:'не авторизован'})
            console.log(e);
        }
    }
}