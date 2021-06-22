import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { apiPost } from '../../services/api-service';
import useStyles from './styles-login_form';

export default function LoginForm() {
  /* To do: fix login  */
  const classes = useStyles();
  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchData = async () =>{
    var raw = JSON.stringify({
      "email": username,
      "password": password
    });
    const result = await apiPost('sessions',raw,'');
    setSession(result);
  };

  const errors = (ers) =>{
    setError(ers)
  };
  
  useEffect((ers)=>{
    errors(ers)
  },[])
  
  useEffect(()=>{
    if(session){
      const state = session["state"];
      if (state === "OK"){
        const token = session["token"];
        dispatch(login({
          username,
          password,
          token,
          loggedIn: true,
        }));

      }
      else{
        errors(session["error"]);
      }
    }
  },[session])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();    
  };

  const renderErrorMsg = () => {
    if (error) {

      return  <Typography className= {classes.errorMsg}>Error: Correo y/o contraseña invalido/s </Typography>
    } 
  }

  return (
        <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
            <Container maxWidth="sm">
              {renderErrorMsg()}
                <Typography component="div" >
                    <Grid container direction="column" alginItems='center' justify='center' spacing={3} >
                        <Grid item alginItems='center'>
                            <TextField id="outlined-basic" label="Correo" variant="outlined" value={username} onChange={(e) => setUserame(e.target.value)}/>
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
