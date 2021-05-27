import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './styles-add_user';
import { apiPost } from '../../../../services/api-service';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const AddUser = (props) => {
  const classes = useStyles();
  const [rol, setRol] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setErrors] = React.useState('');

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  const register = () => {
    const validEmail = validateEmail(email);
    const body = {
      name,
      password,
      email,
      rol,
    };
    if (validEmail) {
      apiPost('users', JSON.stringify(body), null);
      props.reload();
      props.hideModal();
    } else {
      setErrors('Email no está en el formato correcto');
    }
  };

  return (
      <div className={classes.paperContainer}>
        <div className={classes.paper}>
        <button className={classes.close} onClick={props.hideModal}>&#x2715;</button>
        <h2 className={classes.header}>Agregar nuevo usuario</h2>
        <TextField id="standard-basic" label="Email" onChange={(e) => setEmail(e.target.value)} className={classes.input}/>
        { !error ? <></>
          : <div className = {classes.error} >
              <p className = {classes.msg} >Email en el formato incorrecto</p>
            </div>
        }
        <TextField id="standard-basic" label="Nombre completo" onChange={(e) => setName(e.target.value)} className={classes.input}/>
        <TextField id="standard-basic" label="Contraseña" onChange={(e) => setPassword(e.target.value)} className={classes.input}/>
        <FormControl className={classes.input}>
        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rol}
            onChange={handleChange}
        >
            <MenuItem value={1}>Asistente</MenuItem>
            <MenuItem value={2}>Administrador</MenuItem>
            <MenuItem value={3}>Supervisor</MenuItem>
        </Select>
        </FormControl>
        <button className={classes.add} onClick={register}>Agregar</button>
        </div>
      </div>
  );
};

export default React.forwardRef((props, ref) => <AddUser {...props} forwardedRef={ref} />);
