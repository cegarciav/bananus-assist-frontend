import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import LoginForm from './login_form';


export default function Login (){
    
    return (
        <div style={{backgroundColor:'#feff96'}} >
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <Card> 
                    <CardHeader title={'Login'} style={{textAlign: 'center'}} />
                    <CardContent>
                        <Grid item >
                            <LoginForm />
                        </Grid>  
                    </CardContent>
                </Card>
                

            </Grid> 
        </div>
    );
}
