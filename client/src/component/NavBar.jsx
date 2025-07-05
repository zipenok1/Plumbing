import React, { useContext, useState } from "react";
import { Context } from "..";
import { Link } from "react-router-dom";
import { CATALOG_ROUTE, CHARACTER_ROUTE, PUBLIC_ROUTE, BASKET_ROUTE, ORDER_ROUTE, CONTACTS_ROUTE } from '../utils/const'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom";
import '../styles/NavBar.css'

const NavBar = observer(()=> {
    const [open, setOpen] = useState(false)
    const {user} = useContext(Context)
    const openNav = () => {
        setOpen(!open)
    }
    const test = () =>{
        user.setIsAuth(false)
        localStorage.removeItem('token')
        history(PUBLIC_ROUTE)
      }
    const history = useNavigate()
      console.log(open);
  return (
    <div className="NavBar">
    { user.isAuth ?
        <div className="navbar__box">
                <div className="navbar__flex"> 
                    <div className="navbar__flex-left">
                            <Link to={CATALOG_ROUTE}>
                                <button>КАТАЛОГ</button>
                            </Link>

                            <Link to={CHARACTER_ROUTE}>
                                <button>ТОВАР</button>
                            </Link>

                            <Link to={ORDER_ROUTE}>
                                <button>ЗАКАЗЫ</button>
                            </Link>
                        </div>
                        <div 
                            className="navbar__flex-right"
                            style={{backgroundColor:'#fff', padding: '20px 24px'}}
                            >
                            <Link to={PUBLIC_ROUTE}>
                                <button className="navbar__flex-exit" onClick={test}>ВЫЙТИ</button>
                            </Link>         
                        </div>                    
                </div>                            
        </div> 
        :
        <div className="navbar__box">
                <div className="navbar__flex">
                    <div className="menu-btn"><span onClick={openNav}></span></div>
                    {   open 
                        ? 
                        <div className="bur__flex-left">
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
                        : 
                        null
                    }
                    <div className="navbar__flex-left">
                        <Link to={PUBLIC_ROUTE}>
                            <button className="navbar__flex-logo" style={{backgroundColor:'rgba(0, 76, 147, 1)'}}>САНТЕХ</button>
                        </Link>

                        <Link to={`${PUBLIC_ROUTE}#Tiles`}>
                            <button>ТОВАРЫ</button>
                        </Link>

                        <Link to={`${PUBLIC_ROUTE}#We`}>
                            <button>О НАС</button>
                        </Link>

                        <Link to={`${PUBLIC_ROUTE}#New`}>
                            <button>НОВИНКИ</button>
                        </Link>

                        <Link className="nav__button" to={`${PUBLIC_ROUTE}#Catalog`}>
                            <button>КАТАЛОГ</button>
                        </Link>

                        <Link to={CONTACTS_ROUTE}>
                                <button>КОНТАКТЫ</button>
                        </Link>
                    </div>
                    <div className="navbar__flex-right">
                        <Link to={BASKET_ROUTE}>
                            <img src='/imeges/basket.svg' alt="kar" />
                        </Link>          
                    </div>        
                </div>           
        </div> 
    }
    </div>  
  )
})
export default NavBar;