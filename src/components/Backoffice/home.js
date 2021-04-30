import React from 'react';
import Catalog from '../Catalog';
import { useSelector } from "react-redux";
import { selectUser } from '../../features/userSlice';
import Login from '../Login/login_page';


export default function Backoffice (){
    
    const user = useSelector(selectUser);

    return (
        <div>
            { user ? <Catalog/> : <Login/> }
        </div>
    );
}