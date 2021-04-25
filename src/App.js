import './App.css';

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';
import Backoffice from './components/Backoffice/home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
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
}

export default App;