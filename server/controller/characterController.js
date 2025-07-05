const {Character} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require("uuid")
const path = require('path')
const { log } = require('console')

class CharacterController {
    async receiving(req, res){
        try{
            const {id_catalog} = req.params
            if (!id_catalog) {
                return next(ApiError.badRequest('такого элемента не существует'))
              }    
              const event = await Character.findAll({ where: {id_catalog: id_catalog}})
              return res.json(event)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async add(req, res){
        const event = await Character.findAll()
        return res.json(event) 
    }
    async addition(req, res, next){
        try{
            const {name, descript, price, more, id_catalog} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const event = await Character.create({name, descript, price, more, id_catalog, img:fileName})
            return res.json(event)
        } catch (e){
            next(ApiError.badRequest(e.message))
        } 
    }
    async editing(req, res, next){
        try{
            const {id_character} = req.params
            const {name, descript, price, more, id_catalog}= req.body
            let fileName
            if(req.files !== null){
                const {img} = req.files
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            if(!id_character){
                return next(ApiError.badRequest('такого элемента не существует'))

            }
            const event = await Character.findOne({ where: { id_character: id_character } });
            if (!event) {
                return next(ApiError.badRequest('такого элемента не существует'));
            }
            if(req.files === null){
                await Character.update(
                    {name:name, descript:descript, price:price, more:more, id_catalog:id_catalog},
                    {where:{id_character:id_character}}
                )
            } 
            else{
                await Character.update(
                    {name:name, descript:descript, price:price, more:more, id_catalog:id_catalog, img: fileName},
                    {where:{id_character:id_character}}
                )
            }
            return res.json({ message: 'записть ' + id_character + ' обновлена'})
        } catch (e){
            
            console.log(e);
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next){
        try{
            const {id_character} = req.params
            if(!id_character){
               return next(ApiError.badRequest('такого элемента не существует'))
            }
            const event = await Character.findOne({ where: { id_character: id_character } });
            if (!event) {
                return next(ApiError.badRequest('такого элемента не существует'));
            }
            await Character.destroy({where:{id_character:id_character}})
            return res.json({ message: 'записть ' + id_character + ' удалена'})
        } catch (e) {
            next(ApiError.internal(e.message))
        }    
    }
}
module.exports = new CharacterController()