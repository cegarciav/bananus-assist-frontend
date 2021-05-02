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
import Login from './components/Backoffice/home';
import Menu from './components/Backoffice/menu';
import AssignPage from './components/Backoffice/AsignAssistant/assign_page';

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
          <RouteWithNavbar exact path="/backoffice" component={Menu } />
          <RouteWithNavbar path="/backoffice/assign_location/:userId" component={AssignPage } />
          <RouteWithNavbar exact path="/catalog" component={() => <Catalog {...props} />} />
          <RouteWithNavbar exact path="/assistants" component={() => <Assistants {...props} />} />
          <RouteWithNavbar exact path="/pointsOfSale" component={() => <PointsOfSale {...props} />} />
          <RouteWithNavbar exact path="/stores" component={() => <Stores {...props} />} />
          <RouteWithNavbar exact path="/home" component={() => <Home {...props} />} />
          <RouteWithNavbar exact path="/" component={() => <Home {...props} />} />
          <RouteWithNavbar  exact path="/login" component={Login} />   
        </Switch>
      </Router>  
    )
  }

export default App;