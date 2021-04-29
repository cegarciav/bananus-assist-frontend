import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Catalog from './components/Catalog';
import Stores from './components/Backoffice/stores';
import PointsOfSale from './components/Backoffice/points-of-sale';
import Assistants from './components/Backoffice/assistants';
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
          <RouteWithNavbar exact path="/Assistants" component={() => <Assistants {...props} />} />
          <RouteWithNavbar exact path="/PointsOfSale" component={() => <PointsOfSale {...props} />} />
          <RouteWithNavbar exact path="/Stores" component={() => <Stores {...props} />} />
          <RouteWithNavbar exact path="/Home" component={() => <Home {...props} />} />
          <RouteWithNavbar exact path="/" component={() => <Home {...props} />} />
          <RouteWithNavbar exact path="/backoffice" component={Backoffice} />          
        </Switch>
      </Router>  
    )
  }

export default App;