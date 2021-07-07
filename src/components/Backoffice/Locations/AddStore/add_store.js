import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import useStyles from './styles-add_store';
import { apiPost } from '../../../../services/api-service';

const AddStore = (props) => {
  const classes = useStyles();
  const [store, setStore] = React.useState('');
  const [name, setName] = React.useState('');
  const [errors, setErrors] = React.useState('');

  const handleChange = (event) => {
    setStore(event.target.value);
  };

  const agregar = () => {
    if (name && store) {
      const body = {
        department: name,
        storeId: store,
      };
      apiPost('sale-points', JSON.stringify(body), null)
        .then(() => {
          setErrors('');
          props.reload();
          props.hideModal();
        })
        .catch();
      setErrors('');
    } else {
      setErrors('Debe rellenar todo los campos');
    }
  };

  return (
      <div className={classes.paperContainer}>
        <div className={classes.paper}>
        <button className={classes.close} onClick={props.hideModal}>&#x2715;</button>
        <h2 className={classes.header}>Agregar nuevo punto de venta</h2>
        <TextField id="standard-basic" label="Departamento" onChange={(e) => setName(e.target.value)} className={classes.input}/>
        <div className={classes.input}>
                        <FormControl variant="outlined" >
                          <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  value={store}
                                  onChange={handleChange}
                            >
                                  { props.stores.result.map(
                                    (st) => <option key={st.id}
                                                      value={st.id}
                                                      className={classes.option} >
                                                  {st.name}
                                            </option>,
                                  )
                                  }
                            </Select>
                          </FormControl>
                      </div>
       {errors ? <p className={classes.error}>{errors}</p> : ''}
        <button className={classes.add} onClick={agregar}>Agregar</button>
        </div>
      </div>
  );
};

export default React.forwardRef((props, ref) => <AddStore {...props} forwardedRef={ref} />);
