import React from 'react';
import { Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice'

export default function Logout (){
    
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
            <Button variant="contained" color="secondary" onClick = {(e) => handleLogout(e)}>
                Cerrar Sesión
            </Button>
        </Grid>
    );
}
