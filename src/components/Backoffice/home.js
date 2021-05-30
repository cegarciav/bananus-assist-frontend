import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Login from '../Login/login_page';
import socket from '../socket'

export default function Backoffice() {
  const user = useSelector(selectUser);
  return (
        <div >
            { user ? <Redirect to='/backoffice'/> : <Login/> }
        </div>

  );
}
