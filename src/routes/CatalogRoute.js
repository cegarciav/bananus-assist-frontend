import React from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar/navbar';
import DeviceLogin from '../components/Login/device_login_page';
import Catalog from '../components/Catalog';

export default function CatalogRoute({
  exact,
  path,
  props,
  ...rest
}) {
  const token = Cookies.get('token');
  return (
    <Route
      exact={exact}
      path={path} {...rest}
      render={(contentProps) => (
        token
          ? <>
              <Navbar/>
              <Catalog {...contentProps}/>
            </>
          : <DeviceLogin/>
      )}
    />
  );
}
