import React from 'react'
import '../styles/sections/we.css'
import Button from '../component/Button'
import { Link } from "react-router-dom";
import {CATALOGPAGE_ROUTE} from '../utils/const'

function We() {
  return (
    <div id='We' className='We'>
        <div className="We__content">
            <h2>О нас</h2>
            <div className='We__content-box'>
                <div className='We__box-img'/>
                <div className="We__box-card">
                    <p>Мы надежный поставщик качественной сантехнической продукции, предлагающий широкий ассортимент товаров для обустройства комфортного и функционального пространства. Наше главное преимущество сочетание доступных цен с высоким качеством продукции.</p>
                    <Link to={CATALOGPAGE_ROUTE}>
                      <Button we_text="КАТАЛОГ ТОВАРОВ"/>    
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default We