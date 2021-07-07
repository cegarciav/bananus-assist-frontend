import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import useStyles from './styles-routes';
import Navbar from '../components/Navbar/navbar';
import ShowStore from '../components/Backoffice/Locations/Stores/show_store';

export default function StoreRoute({
  exact,
  path,
  props,
  ...rest
}) {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const navbarUserContent = (contentProps) => (
    (user.rol === 'administrator' || user.rol === 'supervisor')
      ? <ShowStore {...contentProps}/>
      : <div className={classes.imageContainer}>
          <img src="https://wallpapercave.com/wp/wp4266697.png" alt="display image" />
        </div>
  );
  return (
    <Route
      exact={exact}
      path={path} {...rest}
      render={(contentProps) => (
        <>
          <Navbar/>
          { user ? navbarUserContent(contentProps) : <Redirect to="/login" /> }
        </>
      )}
    />
  );
}
