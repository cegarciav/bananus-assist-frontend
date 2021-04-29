import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Catalog from './components/Catalog';
import Navbar from './components/Navbar/navbar';
import Backoffice from './components/Backoffice/home';


function App (props){

    const RouteWithNavbar = ({exact, path, component:Component, ...rest}) => {
      return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
        return <><Navbar/><Component {...routeProps}/></>;
      }}
      />;
    };
    return (
      <Router>
        <Switch>
          <RouteWithNavbar exact path="/Catalog" component={() => <Catalog {...props} />} />
          <RouteWithNavbar exact path="/Home" component={() => <Home {...props} />} />
          <RouteWithNavbar exact path="/" component={() => <Home {...props} />} />
          <Route exact path="/" component={Home} />
          <Route exact path="/backoffice">
            <Backoffice />
          </Route>
          {
          /* Para agregar mas rutas, insertar el siguiente componente: 
            <Route path="/<ruta en browser>" component={<nombre del componente>} />
            
          */
         
          }
          
        </Switch>
      </Router>  
    )
  }

export default App;