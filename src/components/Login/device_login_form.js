import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import { apiPost } from '../../services/api-service';

export default function DeviceLoginForm() {
  /* To do: add logic for API integration */

  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const res = await apiPost('sessions/devices', JSON.stringify({
      serialNumber: username,
      password,
    }));
    if (res.state === 'OK') {
      Cookies.set('token', res.token);
      Cookies.set('type', res.type);
    } else {
      // eslint-disable-next-line no-alert
      alert('Contraseña o usuario incorrecto');
    }
  };

  return (
        <form className="login_form" >
            <Container maxWidth="sm" >
                <Typography component="div" >
                    <Grid container direction="column" alginItems='center' justify='center' spacing={3} >
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Serial Number" variant="outlined" value={username} onChange={(e) => setUserame(e.target.value)}/>
                        </Grid>
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Contraseña" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>

                        <Grid item alginItems='center'>
                            <Button color="primary" variant="contained" onClick={ (e) => handleSubmit(e)}>Ingresar</Button>
                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        </form>
  );
}
