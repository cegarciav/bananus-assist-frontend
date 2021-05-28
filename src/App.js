import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './components/Home';
import Catalog from './components/Catalog';
import Navbar from './components/Navbar/navbar';
import Menu from './components/Backoffice/menu';
import AssignPage from './components/Backoffice/AsignAssistant/assign_page';
import Backoffice from './components/Backoffice/home';
import Information from './components/Information/information';
import VideoStream from './components/FaceRecognition/video_stream';

function App(props) {
  const RouteWithNavbar = ({
    exact, path, component: Component, ...rest
  }) => <Route exact={exact} path={path} {...rest} render={
    (routeProps) => <><Navbar/><Component {...routeProps}/></>
  }
    />;

  return (
    <Router>
      <Switch>
        <RouteWithNavbar exact path="/backoffice" component={Menu} />
        <RouteWithNavbar path="/backoffice/assign_location/:userId" component={AssignPage } />
        <RouteWithNavbar exact path="/catalog" component={() => <Catalog {...props} />} />
        <RouteWithNavbar exact path="/home" component={() => <Home {...props} />} />
        <RouteWithNavbar exact path="/" component={() => <Home {...props} />} />
        <RouteWithNavbar exact path="/Information" component={() => <Information {...props} />} />
        <RouteWithNavbar exact path="/backoffice" component={Backoffice} />
        <RouteWithNavbar exact path="/videostream" component={VideoStream} />
      </Switch>
    </Router>
  );
}

export default App;
