import React from 'react'
import Banner from '../sections/Banner'
import Tiles from '../sections/Tiles'
import We from '../sections/We'
import New from '../sections/New'
import Catalog from '../sections/Catalog'

function Home() {
  return (
    <div className='Home'>
      <Banner/>
      <Tiles/>
      <We/>
      <New title='Новинки'/>
      <Catalog/>
    </div>
  )
}
export default Home