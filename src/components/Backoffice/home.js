import React from 'react';
import  { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from '../../features/userSlice';
import Login from '../Login/login_page';

export default function Backoffice (){
    
    const user = useSelector(selectUser);

    return (
        <div >
            { user ?  <Redirect to='/backoffice'  /> : <Login/> }
        </div>
    );
}