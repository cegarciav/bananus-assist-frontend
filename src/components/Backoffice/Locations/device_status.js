import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { InputLabel } from '@material-ui/core';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { apiGet, apiPatch, apiDelete } from '../../../services/api-service';

export default function DeviceStatus(props) {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [name, setName] = useState(false);
  const [store, setStore] = useState(props.device.storeId);
  const [stores, setStores] = useState(false);
  const [errors, setErrors] = useState(false);

  const editStore = () => {
    setEdit(true);
  };
  const deleteStore = () => {
    setDel(true);
  };
  const cancelAction = () => {
    setDel(false);
    setEdit(false);
  };

  const handleChange = (event) => {
    setStore(event.target.value);
  };

  useEffect(() => {
    if (!stores) {
      apiGet('stores').then((result) => setStores(
        { result },
      ));
    }
  }, [stores]);

  const update = () => {
    if (name && store) {
      const body = {
        id: props.device.id,
        department: name,
        storeId: store,
      };
      apiPatch('sale-points', JSON.stringify(body), null)
        .then(() => {
          setDel(false);
          setEdit(false);
          props.reload();
        });
    } else {
      setErrors('');
    }
  };

  const deleteSalePoint = () => {
    const body = {
      id: props.device.id,
    };
    apiDelete('sale-points', JSON.stringify(body), null)
      .then(() => {
        setDel(false);
        setEdit(false);
        props.reload();
      });
  };

  return (
    <div >
        <ListItem>
            <ListItemText>
              {(edit && !del) ? <>
                      <TextField id="standard-basic" label={props.device.name} onChange={(e) => setName(e.target.value)}/>
                      <FormControl variant="outlined" >
                         <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={store}
                                onChange={handleChange}
                          >
                           <InputLabel
                              style={{ disableAnimation: false }}
                              disableAnimation={false}
                              htmlFor="searchCriteria"
                           >
                            {props.device.storeName}
                           </InputLabel>
                                { stores.result.map(
                                  (st) => <option key={st.id}
                                                     value={st.id} >
                                                 {st.name}
                                          </option>,
                                )
                                }
                          </Select>
                        </FormControl>
                      <button onClick = {update} >Editar</button>
                      <button onClick = {cancelAction} >Cancelar</button>
                    </>
                : <>{del ? <></> : <>{props.device.name}{props.device.storeName}</>}</>
              }
              {del && !edit ? <>
                        <p>
                          ¿Estas seguro que quiere eliminar el punto de venta {props.device.name}?
                        </p>
                        <button onClick={deleteSalePoint}>Eliminar</button>
                        <button onClick = {cancelAction} >Cancelar</button>
                     </>
                : <></>
              }
            </ListItemText>
            {(edit || del) ? <></>
              : <>
                  <p onClick = {editStore}>edit</p>
                  <p onClick = {deleteStore}>delete</p>
                </>
            }
            <ListItemSecondaryAction>
                {props.device.isOn ? <WifiIcon edge="end" color="primary"/> : <WifiOffIcon edge="end" color="secondary"/> }
            </ListItemSecondaryAction>
        </ListItem>
    </div>
  );
}
