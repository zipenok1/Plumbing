import React from 'react'
import '../styles/product.css'
import ProductCard from '../component/ProductCard'

function Product({title, id}) {
  return (
    <div className='Product'>
        <div className="Product__content">
            <h2>{title}</h2>
                <div className='Product__content-card'>
                    <ProductCard
                      id={id}
                    />
                </div>
        </div>
    </div>
  )
}

export default Product