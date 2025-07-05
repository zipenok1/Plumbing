import React, { useState } from 'react';
import '../styles/pagesUser/basket.css';
import { observer } from 'mobx-react-lite';
import { $host } from '../http/index';
import Modal from '../component/Modal';
import useProduct from '../hooks/useProduct';

const Basket = observer(() => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getProductQuantity,
    clearCart,
    cartTotal,
    getProductTotal,
  } = useProduct();

  const [open, setOpen] = useState({ isModal: false });
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');

  const openModal = (mod) => {
    setOpen({ isModal: !mod });
  };

  const getOrderNames = (paymentMethod, deliveryMethod) => {
    const productsInfo = cart
      .map((el) => `${el.name} - ${el.quantity} штук; ${el.price} ₽`)
      .join('\n');

    const paymentText =
      paymentMethod === 'cash' ? 'Наличные' : 'Оплата картой при получении';
    const deliveryText = deliveryMethod === 'pickup' ? 'Самовывоз' : 'Доставка';

    return `${productsInfo}\n\nСпособ оплаты: ${paymentText}; \nСпособ доставки: ${deliveryText}`;
  };

  const sendEmail = async (email, orderDetails) => {
    try {
      const response = await fetch('https://tarasovasanteh.ru/api/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subject: 'Ваш заказ на ТрасоваСантех',
          message: `Вы заказали товар на сайте ТрасоваСантех. Детали заказа:\n\n${orderDetails}\n\nСкоро с вами свяжется менеджер.`,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        console.error('Ошибка отправки письма:', result.error);
      }
    } catch (error) {
      console.error('Ошибка при отправке письма:', error);
    }
  };

  const handleSubmitOrder = async (formData) => {
    try {
      const orderDetails = getOrderNames(
        formData.paymentMethod,
        formData.deliveryMethod
      );

      const orderData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address || '',
        nameOrder: orderDetails,
        priceOrder: cartTotal,
        paymentMethod: formData.paymentMethod,
        deliveryMethod: formData.deliveryMethod,
      };

      console.log('Отправляемые данные:', orderData);

      // Отправка данных на основной сервер
      const response = await $host.post('api/order/addition', orderData);

      if (response.data) {
        console.log('Ответ сервера:', response.data);

        // Отправка письма пользователю
        await sendEmail(formData.email, orderDetails);

        alert('Заказ успешно оформлен! На вашу почту отправлено подтверждение.');
        clearCart();
      } else {
        throw new Error('Ошибка при оформлении заказа');
      }
      setOpen({ isModal: false });
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при оформлении заказа: ' + error.message);
    }
  };

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Имя *', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Телефон *', required: true },
    { name: 'email', type: 'email', placeholder: 'Почта *', required: true },
    {
      name: 'address',
      type: 'text',
      placeholder: 'Адрес доставки *',
      required: selectedDelivery !== 'pickup',
      hidden: selectedDelivery === 'pickup',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      placeholder: 'Способ оплаты',
      required: true,
      options: [
        { value: 'cash', label: 'Наличные' },
        { value: 'card', label: 'Оплата картой при получении' },
      ],
      onChange: (e) => setSelectedPayment(e.target.value),
    },
    {
      name: 'deliveryMethod',
      type: 'select',
      placeholder: 'Способ доставки',
      required: true,
      options: [
        { value: 'pickup', label: 'Самовывоз' },
        { value: 'delivery', label: 'Доставка' },
      ],
      onChange: (e) => setSelectedDelivery(e.target.value),
    },
    { name: 'checkbox', type: 'checkbox', required: true },
  ];

  return (
    <div className="Basket">
      <h2>Корзина</h2>
      <div className="Basket__content">
        {cart.length === 0 ? (
          <div className="Basket__content-none">
            <p>В корзине ничего нет...</p>
          </div>
        ) : (
          cart.map((el, index) => (
            <div className="ProductCard__content" key={index}>
              <div className="ProductCard__content-title">
                <img
                  src={`https://tarasovasanteh.store/` + el.img}
                  alt="img"
                />
                <p>{el.name}</p>
              </div>
              <div className="ProductCard__content-desc">
                <p>{getProductTotal(el.id_character)} ₽</p>
                <img
                  className="ProductCard__content-back"
                  src="imeges/back.svg"
                  onClick={() => removeFromCart(el.id_character)}
                />
              </div>
              <div className="ProductCard__content-quantity">
                <button
                  onClick={() =>
                    updateQuantity(
                      el.id_character,
                      getProductQuantity(el.id_character) + 1
                    )
                  }
                >
                  +
                </button>
                <p>{getProductQuantity(el.id_character)}</p>
                <button
                  onClick={() =>
                    updateQuantity(
                      el.id_character,
                      getProductQuantity(el.id_character) - 1
                    )
                  }
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <p className="ProductCard-price">Итого по заказу: {cartTotal} ₽</p>
      {open.isModal && (
        <Modal
          onClose={() => setOpen({ isModal: false })}
          fields={fields}
          title="Оформить заказ"
          initialData={{
            nameOrder: getOrderNames(selectedPayment, selectedDelivery),
            priceOrder: cartTotal,
            paymentMethod: selectedPayment,
            deliveryMethod: selectedDelivery,
          }}
          onSubmit={handleSubmitOrder}
          submitButtonText="ЗАКАЗАТЬ"
        />
      )}
      <button
        onClick={() => openModal(open.isModal)}
        className="Basket__bott"
        style={
          cart.length === 0
            ? { backgroundColor: 'rgba(225, 238, 251, 1)', cursor: 'no-drop' }
            : null
        }
        disabled={cart.length === 0}
      >
        ОФОРМИТЬ
      </button>
    </div>
  );
});

export default Basket;