import React from 'react'
import '../styles/sections/new.css'
import ProductCard from '../component/ProductCard'

function New({title, id}) {
  return (
    <div id='New' className='New'>
        <div className="New__content">
            <h2>{title}</h2>
                <div className='New__content-card'>
                    <ProductCard 
                      id={3}
                    />
                </div>
        </div>
    </div>
  )
}

export default New