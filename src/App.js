import './App.css';

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Backoffice/home';
import Menu from './components/Backoffice/menu';
import AssignPage from './components/Backoffice/AsignAssistant/assign_page';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/backoffice">
            <Menu />
          </Route>
          <Route path="/Backoffice/assign_location/:userId" component={AssignPage } />
          {
          /* Para agregar mas rutas, insertar el siguiente componente: 
            <Route path="/<ruta en browser>" component={<nombre del componente>} />
            
          */
         
          }
          
        </Switch>
      </Router>  
    )
  }
}

export default App;