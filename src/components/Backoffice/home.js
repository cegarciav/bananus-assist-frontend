import React from 'react';
import Logout from '../Login/logout_button';
import { useSelector } from "react-redux";
import { selectUser } from '../../features/userSlice';
import Login from '../Login/login_page';


export default function Backoffice (){
    
    const user = useSelector(selectUser);


    return (
        <div style={{backgroundColor:'#feff96'}} >
            { user ? <Logout/> : <Login/> }
        </div>
    );
}