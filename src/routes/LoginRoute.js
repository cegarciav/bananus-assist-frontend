import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import Login from '../components/Login/login_page';

export default function LoginRoute({
  exact,
  path,
  props,
  ...rest
}) {
  return (
    <Route
      exact={exact}
      path={path} {...rest}
      render={(contentProps) => (
        <>
          <Navbar/>
          <Login {...contentProps}/>
        </>
      )}
    />
  );
}
