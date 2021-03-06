import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import useStyles from './styles-routes';
import Navbar from '../components/Navbar/navbar';
import AssignPage from '../components/Backoffice/AsignAssistant/assign_page';

export default function AssignLocationRoute({
  exact,
  path,
  component: Component,
  ...rest
}) {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const navbarUserContent = (props) => (
    (user.rol === 'administrator' || user.rol === 'supervisor')
      ? <AssignPage {...props}/>
      : <div className={classes.imageContainer}>
          <img src="https://wallpapercave.com/wp/wp4266697.png" alt="display image" />
        </div>
  );
  return (
    <Route
      exact={exact}
      path={path} {...rest}
      render={(props) => (
        <>
          <Navbar/>
          { user ? navbarUserContent(props) : <Redirect to="/login" /> }
        </>
      )}
    />
  );
}
