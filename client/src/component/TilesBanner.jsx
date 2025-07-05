import React from 'react'
import '../styles/tilesBanner.css'

function TilesBanner({tetle, desc}) {

  return (
    <div className='TilesBanner'>
        <div className='Tiles__box-content'>
            <p>{tetle}</p>
        </div>
            <p className='Tiles__box-text'>{desc}</p>
    </div>
  )
}

export default TilesBanner