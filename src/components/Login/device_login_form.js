import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { apiPost } from '../../services/api-service';

export default function DeviceLoginForm() {
  /* To do: add logic for API integration */

  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiPost('sessions/devices', JSON.stringify({
      serialNumber: username,
      password,
    }));
    if (res.state === 'OK') {
      Cookies.set('token', res.token);
      Cookies.set('type', res.type);
      Cookies.set('storeId', res.storeId);
      Cookies.set('salePointId', res.sale_pointId);
      setToken(res.token);
    } else {
      // eslint-disable-next-line no-alert
      alert('Contraseña o usuario incorrecto');
    }
  };

  return (token ? <Redirect to="/Catalog" />
    : <form className="login_form" >
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
                            <Button color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={ (e) => handleSubmit(e)}
                            >
                              Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        </form>
  );
}
