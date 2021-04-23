import './App.css';

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login/login_page';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          
          <Route path="/backoffice">
            <Login />
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
}

export default App;