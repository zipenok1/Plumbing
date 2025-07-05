import React, { useEffect, useState } from 'react'
import Banner from '../sections/Banner'
import '../styles/pagesUser/catalog.css'
import {$host} from '../http/index'
import Product from '../component/Product';
import {useParams} from 'react-router-dom'

function Catalog() {

  const {id} = useParams()
  const [date, setDate] = useState([])
  const [storeID, setStoreID] = useState(id)

  useEffect(()=>{
      $host.get(`api/catalog/receiving`)
        .then((res)=>{
          setDate(res.data)
        })  
    },[])

  const handelClick = (id) =>{
    setStoreID(id)
  }

  console.log(storeID);
  return (
    <div className='Catalog'>
        <Banner/>
          <div className='Catalog__content'>
            <h2>Каталог</h2>
            <div style={{display:'flex', gap: 10, marginTop:50, flexWrap: 'wrap'}}>
              {
                date.map((el)=>(
                  <div className='Catalog__content-nav' key={el.id_catalog}>
                    <button onClick={()=>handelClick(el.id_catalog)}>{el.name}</button>
                  </div>  
                ))
              }
            </div>
          <Product id={storeID}/>
        </div>
    </div>
  )
}

export default Catalog