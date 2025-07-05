import React, { useEffect, useState } from 'react';
import '../styles/productCard.css';
import { $host } from '../http/index';
import { observer } from 'mobx-react-lite';
import useProduct from '../hooks/useProduct';

const ProductCard = observer(({ id }) => {
  const {addToCart} = useProduct()

  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [date, setDate] = useState([]);
  
  const getIdProducts = async (id) => {
    const res = await $host.get(`api/character/receiving/${id}`);
    setDate(res.data);
  };

  useEffect(() => {
    const idCheck = id ?? 5;
    getIdProducts(idCheck);
  }, [id]);

  const handleCardClick = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };
  console.log(date);

  return (
    <div className="ProductCard">
      {date.map((el, index) => (
        activeCardIndex === index ?
          <div
            className= "ProductCard__content-more"
            onClick={() => handleCardClick(index)}
            style={{background:`url(https://tarasovasanteh.store/${el.img}) center / cover no-repeat `,}}
          >
            <p>{el.descript}</p>
          </div> 
          :
          <div
            key={index}
            className= "ProductCard__content"
            onClick={() => handleCardClick(index)}
          >
          <div className="ProductCard__content-title">
            <img src={`https://tarasovasanteh.store/` + el.img} alt="img" />
            <p>{el.name}</p>
          </div>
          <div className="ProductCard__content-desc">
            <p>{el.price} ₽</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(el);
              }}
            >
              В КОРЗИНУ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ProductCard;