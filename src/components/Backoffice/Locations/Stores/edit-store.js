/* eslint-disable camelcase */
import React from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles-add-store';
import { apiPatch } from '../../../../services/api-service';

const EditStore = (props) => {
  const { store } = props;
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const history = useHistory();
  const [errors, setErrors] = React.useState('');

  const edit = () => {
    setErrors('Debes rellenar todos los campos');
    if (name && address) {
      const body = {
        name,
        new_address: address,
        address: store.address,
      };
      apiPatch('stores', JSON.stringify(body), null)
        .then(() => {
          props.hideModal();
        });
      setErrors('');
    }
    let edit_name = name;
    let edit_address = address;
    if (name !== '') {
      edit_name = name;
    } else {
      edit_name = store.name;
    }

    if (address !== '') {
      edit_address = address;
    } else {
      edit_address = store.address;
    }
    const editedStore = {
      address: edit_address,
      name: edit_name,
      id: store.id,
      supervisors: store.supervisors,
      assistants: store.assistants,
    };

    history.push(String('/backoffice/store/') + store.id, { store_prop: editedStore });
  };

  return (
      <div className={classes.paperContainer}>
        <div className={classes.paper}>
        <button className={classes.close} onClick={props.hideModal}>&#x2715;</button>
        <h2 className={classes.header}>Editar Tienda</h2>
        <TextField id="standard-basic" label="Nombre Tienda" defaultValue={store.name} onChange={(e) => setName(e.target.value)} className={classes.input}/>
        <TextField id="standard-basic" label="Dirección Tienda" defaultValue={store.address} onChange={(e) => setAddress(e.target.value)} className={classes.input}/>
        <p className={classes.errors} >{errors}</p>
        <button className={classes.add} onClick={edit}>Editar Tienda</button>
        </div>
      </div>
  );
};

export default React.forwardRef((props, ref) => <EditStore {...props} forwardedRef={ref} />);
