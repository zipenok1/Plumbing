import React, { useState, useEffect } from "react";
import { $authHost } from '../http/index';
import '../styles/pagesAdmin/order.css';

function Order() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedNameOrder, setEditedNameOrder] = useState("");
  const [editedPriceOrder, setEditedPriceOrder] = useState(0);
 
  const getApp = async () => {
    const res = await $authHost.get(`api/order/add`);
    setOrders(res.data);
  };
  
  useEffect(() => {
    getApp();
  }, []);

  // Функция для извлечения цены за единицу и количества из nameOrder
  const getPriceAndQuantity = (nameOrder) => {
    const products = [];
    let totalPrice = 0;
    
    // Обрабатываем каждую строку с товаром
    nameOrder.split('\n').forEach(line => {
      const match = line.match(/(.+?) - (\d+) штук; (\d+)\s*₽/);
      if (match) {
        const product = {
          name: match[1].trim(),
          quantity: parseInt(match[2]),
          unitPrice: parseInt(match[3].replace(/\s/g, ''))
        };
        products.push(product);
        totalPrice += product.quantity * product.unitPrice;
      }
    });
    
    return { products, totalPrice };
  };

  const deleteApp = async (id) => {
    await $authHost.delete(`api/order/deletion/${id}`);
    getApp();
  };

  const editingStatus = async (id, currentStatus) => {
    try {
      let newStatus;
      if (currentStatus === 1) newStatus = 2; 
      else if (currentStatus === 2) newStatus = 1; 
      await $authHost.put(`api/order/editing/${id}`, { statusOrder: newStatus });
      getApp();
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      await $authHost.put(`api/order/editing/${id}`, { statusOrder: 3 });
      getApp();
    } catch (error) {
      console.error("Ошибка при отмене заказа:", error);
    }
  };

  const startEditing = (order) => {
    setEditingId(order.id_order);
    setEditedNameOrder(order.nameOrder);
    setEditedPriceOrder(order.priceOrder);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedNameOrder("");
    setEditedPriceOrder(0);
  };

  const handleNameOrderChange = (e) => {
    const newValue = e.target.value;
    setEditedNameOrder(newValue);
    
    // Пересчитываем общую цену при изменении
    const { totalPrice } = getPriceAndQuantity(newValue);
    setEditedPriceOrder(totalPrice);
  };

  const handlePriceOrderChange = (e) => {
    setEditedPriceOrder(parseInt(e.target.value) || 0);
  };

  const editingAll = async (id) => {
    try {
      await $authHost.put(`api/order/editingAll/${id}`, { 
        nameOrder: editedNameOrder,
        priceOrder: editedPriceOrder
      });
      getApp();
      cancelEditing();
    } catch (error) {
      console.error("Ошибка при обновлении заказа:", error);
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 1: return 'Ожидание';
      case 2: return 'Подтвержден';
      case 3: return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 1: return 'status-pending';
      case 2: return 'status-approved';
      case 3: return 'status-canceled';
      default: return '';
    }
  };

  return (
    <div className='Character'>
      <h2>Админ панель</h2>
      {orders.length > 0 ? 
        <div className="order-admin__table-container">
          <table className="order-admin__table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Адрес</th>
                <th>Почта</th>
                <th>Название заказа</th>
                <th>Общая стоимость</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id_order}>
                  <td>{order.name}</td>
                  <td>+{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.email}</td>
                  <td>
                    {editingId === order.id_order ? (
                      <textarea
                        value={editedNameOrder}
                        onChange={handleNameOrderChange}
                        className="order-admin__edit-textarea"
                        placeholder="Формат: Товар - 1 штук; 1000 ₽"
                      />
                    ) : (
                      order.nameOrder
                    )}
                  </td>
                  <td>
                    {editingId === order.id_order ? (
                      <input
                        type="number"
                        value={editedPriceOrder}
                        onChange={handlePriceOrderChange}
                        className="order-admin__edit-input"
                      />
                    ) : (
                      `${order.priceOrder.toLocaleString('ru-RU')} ₽`
                    )}
                  </td>
                  <td className={`status-cell ${getStatusClass(order.statusOrder)}`}>
                    {getStatusText(order.statusOrder)}
                  </td>
                  <td>
                    {editingId === order.id_order ? (
                      <div className="order-admin__edit-actions">
                        <button 
                          onClick={() => editingAll(order.id_order)}
                          className="approve"
                          style={{marginBottom:'10px'}}
                        >
                          Сохранить
                        </button>
                        <button 
                          onClick={cancelEditing}
                          className="order-admin__delete-btn"
                        >
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <>
                        {order.statusOrder !== 3 && (
                          <div className="status-box">
                            <button 
                              onClick={() => editingStatus(order.id_order, order.statusOrder)}
                              className={`order-admin__status-btn ${
                                order.statusOrder === 1 ? 'approve' : 'pending'
                              }`}
                            >
                              {order.statusOrder === 1 ? 'Подтвердить' : 'Ожидание'}
                            </button>
                            <button 
                              onClick={() => cancelOrder(order.id_order)}
                              className="order-admin__cancel-btn"
                            >
                              Отменить
                            </button>
                          </div>
                        )}
                        <button 
                          onClick={() => startEditing(order)}
                          className="order-admin__edit-btn"
                        >
                          Редактировать
                        </button>
                        <button 
                          onClick={() => deleteApp(order.id_order)}
                          className="order-admin__delete-btn"
                        >
                          Удалить
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        : null
      }
    </div>
  );
}

export default Order;