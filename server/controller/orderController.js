const {Order} = require('../models/models')
const ApiError = require('../error/ApiError')

class CharacterController {
    async add(req, res){
        const event = await Order.findAll()
        return res.json(event) 
    }
    async addition(req, res, next){
        try{
            const {name, phone, address, email, nameOrder, statusOrder, priceOrder} = req.body
            const event = await Order.create({name, phone, address, email, nameOrder, statusOrder, priceOrder})
            return res.json(event)
        } catch (e){
            next(ApiError.badRequest(e.message))
        } 
    }
    async editing(req, res, next){
        try{
            const {id_order} = req.params
            const {statusOrder}= req.body
            if(!id_order){
                return next(ApiError.badRequest('такого элемента не существует'))
            }
            const event = await Order.findOne({ where: { id_order: id_order } });
            if (!event) {
                return next(ApiError.badRequest('такого элемента не существует'));
            }
            await Order.update(
                {statusOrder: statusOrder},
                {where:{id_order:id_order}}
            )
            
            return res.json({ message: 'данные ' + id_order + ' обновлены'})
        } catch (e){
            
            console.log(e);
            next(ApiError.badRequest(e.message))
        }
    }
    async editingAll(req, res, next) {
        try {
            const {id_order} = req.params;
            const {nameOrder, priceOrder} = req.body;
            
            if(!id_order) {
                return next(ApiError.badRequest('Не указан ID заказа'));
            }
            
            // Проверяем существование заказа
            const order = await Order.findOne({ where: { id_order: id_order } });
            if (!order) {
                return next(ApiError.badRequest('Заказ не найден'));
            }
            
            // Подготовка объекта для обновления
            const updateData = {};
            if (nameOrder !== undefined) updateData.nameOrder = nameOrder;
            if (priceOrder !== undefined) updateData.priceOrder = priceOrder;
            
            // Если не передано ни одного поля для обновления
            if (Object.keys(updateData).length === 0) {
                return next(ApiError.badRequest('Не указаны данные для обновления'));
            }
            
            // Валидация priceOrder
            if (priceOrder !== undefined && (isNaN(priceOrder) || priceOrder < 0)) {
                return next(ApiError.badRequest('Цена должна быть положительным числом'));
            }
            
            // Валидация nameOrder
            if (nameOrder !== undefined && !nameOrder.trim()) {
                return next(ApiError.badRequest('Описание заказа не может быть пустым'));
            }
            
            // Обновляем заказ
            await Order.update(updateData, {
                where: {id_order: id_order}
            });
            
            return res.json({ 
                success: true,
                message: 'Данные заказа обновлены',
                updatedFields: Object.keys(updateData)
            });
            
        } catch (e) {
            console.log(e);
            next(ApiError.badRequest(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const {id_order} = req.params
            if(!id_order){
               return next(ApiError.badRequest('такого элемента не существует'))
            }
            const event = await Order.findOne({ where: { id_order: id_order } });
            if (!event) {
                return next(ApiError.badRequest('такого элемента не существует'));
            }
            await Order.destroy({ where:{ id_order: id_order }})
            return res.json({ message: 'записть ' + id_order + ' удалена'})
        } catch (e) {
            next(ApiError.internal(e.message))
        }    
    }
}
module.exports = new CharacterController()