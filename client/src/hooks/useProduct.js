import { useState, useEffect } from 'react';

const useProduct = () => {

  const [cart, setCart] = useState([]);

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Добавление товара в корзину
  const addToCart = (product) => {
    console.log(product);
    if (!product?.id_character) return;

    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id_character === product.id_character);

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += 1;
      
    } else {
      updatedCart.push({
        ...product,
        quantity: 1,
        price: product.price || 0
      });
     
    }

    updateCart(updatedCart);
    return updatedCart;
  };

  // Удаление товара из корзины
  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id_character === productId);
    const updatedCart = cart.filter(item => item.id_character !== productId);
    

    updateCart(updatedCart);
  };

  // Обновление количества товара
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const product = cart.find(item => item.id_character === productId);
    const updatedCart = cart.map(item => 
      item.id_character === productId ? { ...item, quantity: newQuantity } : item
    );


    updateCart(updatedCart);
  };

  // Очистка корзины
  const clearCart = () => {
    updateCart([]);
  };

  // Обновление состояния корзины и localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Подсчет общего количества товаров
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Подсчет общей стоимости
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  // Подсчет стоимости одного товара
  const getProductTotal = (productId) => {
    const item = cart.find(item => item.id_character === productId);
    return item ? (item.price || 0) * item.quantity : 0;
  };


  // Получение информации о конкретном товаре в корзине
  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id_character === productId);
    return item ? item.quantity : 0;
  };
  const refetch = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  };

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getProductQuantity,
    getProductTotal,
    refetch
  };
};

export default useProduct;