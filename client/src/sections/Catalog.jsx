import React from 'react'
import '../styles/sections/catalog.css'
import ProductCard from '../component/ProductCard'
import { Link } from "react-router-dom";
import {CATALOGPAGE_ROUTE} from '../utils/const'

function Catalog() {
  return (
    <div id='Catalog' className='Catalog'>
        <div className="Catalog__content">
            <h2>Переходи в каталог</h2>
            <div className="Catalog__content-box">
                <div className="Catalog__box-text">
                    <p>Ищете идеальную сантехнику для вашего дома? Вы нашли нужное место! В нашем каталоге вы найдете всё, что нужно для создания комфортного и стильного пространства</p>
                    <Link to={CATALOGPAGE_ROUTE}>
                      <button>КАТАЛОГ ТОВАРОВ</button>   
                    </Link>                    
                </div>
                <div className="Catalog__content-card">
                    <ProductCard 
                      id={1}
                    />                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Catalog