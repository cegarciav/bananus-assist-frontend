import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import DeviceLoginForm from './device_login_form';

export default function DeviceLogin() {
  const token = Cookies.get('token');

  return (
        <div >
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <Card>
                    <CardHeader title={'Login'} style={{ textAlign: 'center' }} />
                    <CardContent>
                        <Grid item >
                            {token ? <Redirect to="/Catalog" /> : <DeviceLoginForm />}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </div>
  );
}
