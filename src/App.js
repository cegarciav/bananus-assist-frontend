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
import Login from './components/Backoffice/home';
import DeviceLogin from './components/Login/device_login_page';
import Information from './components/Information/information';
import VideoStream from './components/FaceRecognition/video_stream';
import VideoChat2 from './components/VideoChat/video_chat';
import VideoChat from './components/Backoffice/video-chat';

function App(props) {
  const RouteWithNavbar = ({exact, path, component: Component, ...rest}) => {
    return <Route exact={exact} path={path} {...rest} render={(routeProps) => {
      return <><Navbar/><Component {...routeProps}/></>;
    }}
      />;
  };
  return (
      <Router>
        <Switch>
          <RouteWithNavbar exact path="/backoffice" component={Menu} />
          <RouteWithNavbar path="/backoffice/assign_location/:userId" component={AssignPage } />
          <RouteWithNavbar exact path="/catalog" component={() => <Catalog {...props} />} />
          <RouteWithNavbar exact path="/home" component={() => <Home {...props} />} />
          <RouteWithNavbar exact path="/" component={() => <Catalog {...props} />} />
          <RouteWithNavbar exact path="/login" component={Login} />
          <RouteWithNavbar exact path="/backoffice" component={Backoffice} />
          <RouteWithNavbar exact path="/videocall/:id" component={VideoChat} />
          <RouteWithNavbar exact path="/videostream" component={VideoStream} />
          <RouteWithNavbar exact path="/Information" component={() => <Information {...props} />} />
          <RouteWithNavbar exact path="/videochat" component={VideoChat2} />
          <Route exact path="/DeviceLogin" component={DeviceLogin} />
        </Switch>
      </Router>
  );
}

export default App;
