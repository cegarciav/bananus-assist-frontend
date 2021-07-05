import React from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles-add-store';
import { apiPost } from '../../../../services/api-service';

const AddStore = (props) => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const create = () => {
    setErrors('Debes rellenar todos los campos');
    if (name && address) {
      const body = {
        name,
        address,
      };
      apiPost('stores', JSON.stringify(body), null)
        .then(() => {
          props.reload();
          props.hideModal();
        });
      setErrors('');
    }
  };

  return (
      <div className={classes.paperContainer}>
        <div className={classes.paper}>
        <button className={classes.close} onClick={props.hideModal}>&#x2715;</button>
        <h2 className={classes.header}>Agregar nueva Tienda</h2>
        <TextField id="standard-basic" label="Nombre Tienda" onChange={(e) => setName(e.target.value)} className={classes.input}/>
        <TextField id="standard-basic" label="Dirección Tienda" onChange={(e) => setAddress(e.target.value)} className={classes.input}/>
        <p className={classes.errors} >{errors}</p>
        <button className={classes.add} onClick={create}>Agregar</button>
        </div>
      </div>
  );
};

export default React.forwardRef((props, ref) => <AddStore {...props} forwardedRef={ref} />);
