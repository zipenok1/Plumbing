import React from 'react'
import '../styles/footer.css'
import { Link, useLocation } from "react-router-dom";
import {observer} from 'mobx-react-lite'
import {PUBLIC_ROUTE, POLITIC_ROUTE, CONTACTS_ROUTE} from '../utils/const'

const Footer = observer(() => {

  const {pathname} = useLocation()

  return (
    <div className='Footer'>
      <div className="Footer__content wrap">
        <h2>САНТЕХ</h2>
        <div className="Footer__content-nav">
          <div className="Footer__nav">
              <Link to={`${PUBLIC_ROUTE}#Tiles`}>
                <button>ТОВАРЫ</button>
              </Link>

              <Link to={`${PUBLIC_ROUTE}#We`}>
                <button>О НАС</button>
              </Link>

              <Link to={`${PUBLIC_ROUTE}#New`}>
                <button>НОВИНКИ</button>
              </Link>

              <Link to={`${PUBLIC_ROUTE}#Catalog`}>
                <button>КАТАЛОГ</button>
              </Link>

              <Link to={CONTACTS_ROUTE}>
                <button>КОНТАКТЫ</button>
              </Link>
          </div>
          </div>
          {pathname.includes("/politics")
            ? null
            :
            <div className='politic__content'>
              <Link 
                className='politic__content-butt' 
                to={`${POLITIC_ROUTE}#Politic`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Политика обработки персональных данных</p>
              </Link>
            </div>
          }
      </div>
    </div>
  )
})

export default Footer;