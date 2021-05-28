import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { apiPost } from '../../services/api-service';

export default function LoginForm() {
  /* To do: add logic for API integration */

  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const raw = JSON.stringify({
        "email": username,
        "password": password
      });
      

    /*apiPost ('sessions',raw).then((result) => setSession(
      { result },
    ));*/
    apiPost ('sessions',raw).then((result) => 
    console.log(result)
    );
    

    dispatch(login({
      username,
      password,
      loggedIn: true,
    }));
  };

  return (
        <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
            <Container maxWidth="sm">
                <Typography component="div" >
                    <Grid container direction="column" alginItems='center' justify='center' spacing={3} >
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Usuario" variant="outlined" value={username} onChange={(e) => setUserame(e.target.value)}/>
                        </Grid>
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Contraseña" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>

                        <Grid item alginItems='center'>
                            <Button color="primary" variant="contained" type="submit">Ingresar</Button>
                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        </form>
  );
}
