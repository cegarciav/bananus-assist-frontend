import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useSelector } from 'react-redux';
import LoginForm from './login_form';
import { selectUser } from '../../features/userSlice';

export default function Login() {
  const user = useSelector(selectUser);

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
                            {user ? <h1>he</h1> : <LoginForm /> }
                        </Grid>
                    </CardContent>
                </Card>

            </Grid>
        </div>
  );
}
