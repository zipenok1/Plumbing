const {Catalog} = require('../models/models')
const ApiError = require('../error/ApiError')

class CatalogController {
    async receiving(req, res){
        const event = await Catalog.findAll()
        return res.json(event) 
    }
    async addition(req, res, next){
        try{
            const {name} = req.body
            const event = await Catalog.create({name})
            return res.json(event)
        } catch (e){
            next(ApiError.badRequest(e.message))
        } 
    }
    async editing(req, res, next){
        try{
            const {id_catalog} = req.params
            const {name}= req.body
            
            if(!id_catalog){
                return next(ApiError.badRequest('такого элемента не существует'))
            }
            const event = await Catalog.findOne({ where: { id_catalog: id_catalog } });
            if (!event) {
                return next(ApiError.badRequest('такого элемента не существует'));
            }
            await Catalog.update(
                {name: name},
                {where:{id_catalog:id_catalog}}
            )
            return res.json({ message: 'записть ' + id_catalog + ' обновлена'})
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new CatalogController()