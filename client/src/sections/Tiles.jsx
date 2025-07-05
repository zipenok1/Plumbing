import React from 'react'
import '../styles/sections/tiles.css'
import TilesBanner from '../component/TilesBanner'
import {Link} from 'react-router-dom'

function Tiles() {
  return (
    <div id='Tiles' className='Tiles'>
        <div className='Tiles__content'>
            <h2>Наши товары</h2>
            <div className='Tiles__content-grid'>
                <Link 
                  to='/catelogpublic/1' 
                  className='Tiles__box'>
                  <TilesBanner 
                  tetle='Унитазы'
                  desc='Roca'
                  />
                </Link>
                <Link 
                  to='/catelogpublic/5' 
                  className='Tiles__box'>
                  <TilesBanner 
                  tetle='Котлы'
                  desc='Neva'
                  />
                </Link>
                <Link 
                  to='/catelogpublic/4' 
                  className='Tiles__box'>
                  <TilesBanner 
                  tetle='Фитинги'
                  desc='Rehau'
                  />
                </Link>
                <Link 
                  to='/catelogpublic/2' 
                  className='Tiles__box'>
                  <TilesBanner 
                  tetle='Трубы'
                  desc='Orans'
                  />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Tiles