import './App.css';

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Home} />
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