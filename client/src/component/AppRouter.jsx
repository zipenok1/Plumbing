import React, { useContext } from "react";
import {Routes, Route} from "react-router-dom"
import {authRoutes, publicRoutes} from "../router";
import Home from "../pagesUser/Home";
import { Context } from "..";
import {observer} from 'mobx-react-lite'

const AppRouter = observer(() => {

  const {user} = useContext(Context)
  
  console.log(user._isAuth);

  return (
    <Routes>
        {user.isAuth && authRoutes.map(({path, Component}) =>
          <Route key={path} path={path} Component={Component} exact/>     
        )}
         {publicRoutes.map(({path, Component}) =>
          <Route key={path} path={path} Component={Component} exact/>
        )}
        <Route path="*" Component={Home}/>
        
    </Routes>
  );
})

export default AppRouter;