import React, { useContext } from "react";
import AppRouter from "./component/AppRouter";
import { Context } from ".";
import {observer} from 'mobx-react-lite'
import './styles/app.css'
import NavBar from "./component/NavBar";
import Scroll from "./component/Scroll";
import Footer from "./component/Footer";
import { useLocation } from "react-router-dom";

const App = observer(()=> {
  
  const {pathname} = useLocation()
  const {user} = useContext(Context)

  return (
    <div className="App">
      <div className="wrap">
        <NavBar/>
        <Scroll/>
        <AppRouter/>
      </div>
      {user.isAuth || pathname.includes("/login") 
      ? null 
      :
      <Footer/>
      }
    </div>
  );
})

export default App;
