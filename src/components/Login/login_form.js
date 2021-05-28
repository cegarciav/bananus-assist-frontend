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
  /* To do: add logic for API integration */
  const classes = useStyles();
  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchData = () =>{
    console.log(username);
    console.log(password);

    var raw = JSON.stringify({
      "email": username,
      "password": password
    });
    console.log(raw);
   
    
  apiPost ('sessions',raw).then((result) => setSession(
    { result },
  ));
  };

  const errors = (ers) =>{
    setError(ers)

  };
  
  useEffect((ers)=>{
    errors(ers)
  },[])

  useEffect(()=>{
    fetchData()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData();
    const response = session["result"];
    const state = response["state"];
    if (state === "OK"){
      const token = response["token"]
      dispatch(login({
        username,
        password,
        token,
        loggedIn: true,
      }));

    }
    else{
      errors(response["error"]);
      console.log(response);
    }
    
  };

  const renderErrorMsg = () => {
    if (error) {

      return  <Typography className= {classes.errorMsg}>{error} </Typography>
    } 
  }

  return (
        <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
            <Container maxWidth="sm">
              {renderErrorMsg()}
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
