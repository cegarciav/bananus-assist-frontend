/* eslint-disable import/no-duplicates */
import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AssignLocationRoute from './routes/AssignLocationRoute';
import BackOfficeRoute from './routes/BackOfficeRoute';
import CatalogRoute from './routes/CatalogRoute';
import InformationRoute from './routes/InformationRoute';
import LoginRoute from './routes/LoginRoute';
import VideoCallRoute from './routes/VideoCallRoute';

function App(props) {
  return (
      <Router>
        <Switch>
          <AssignLocationRoute path="/backoffice/assign_location/:userId" props={props} />
          <BackOfficeRoute exact path="/backoffice" props={props} />
          <CatalogRoute exact path="/catalog" props={props} />
          <InformationRoute exact path="/Information" props={props} />
          <LoginRoute exact path="/login" props={props} />
          <VideoCallRoute exact path="/videocall/:id" props={props} />
          <Route
            exact
            path="/"
            render={ () => <Redirect to='/catalog' /> }
          />
        </Switch>
      </Router>
  );
}

export default App;
