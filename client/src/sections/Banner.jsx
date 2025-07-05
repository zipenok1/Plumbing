import React from 'react'
import '../styles/sections/banner.css'
import { Link, useLocation } from "react-router-dom";
import {CATALOGPAGE_ROUTE} from '../utils/const'

function Banner() {
  const {pathname} = useLocation()
  return (
    <div className='Banner'>
        <div className='Banner__content'>
        <div className="Banner__content-grid">
          <div className='Banner__box'>
            <img src="/imeges/banner.jpg" alt="banner" />
              <div className='Banner__box-text'>
                  <h1>САНТЕХ</h1>
                  <p>знаем, что вам нужно!</p>
                    {pathname.includes("/catelogpublic") 
                    ? null 
                    :
                    <Link to={CATALOGPAGE_ROUTE}>
                      <button>ПОДРОБНЕЕ</button>
                    </Link>
                    }  
              </div>     
          </div>
          <div className='Banner__box'>
            <div className='Banner__box-aitem'>
              <p className='Banner__box-title'>ПОПОЛНЕНИЕ КАТАЛОГА</p>
              <p className='Banner__box-desc'>СКОРО</p>
            </div>           
          </div>
          <div className='Banner__box'>
            <div className="Banner__box-aitem">
              <p className='Banner__box-title'>ТОВАРЫ СО СКИДКОЙ</p>
              <p className='Banner__box-desc'>СКОРО</p>
            </div>           
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Banner