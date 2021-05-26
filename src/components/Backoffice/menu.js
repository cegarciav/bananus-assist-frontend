import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import LocationList from './Locations/locations';
import StoreList from './Locations/store_list';
import UserList from './AsignAssistant/user_list';
import VideoChat from './video-chat';
import useStyles from './styles-menu';
import { apiGet } from '../../services/api-service';
import socket from '../socket';

export default function Menu() {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const [stores, setStores] = useState(null);
  const [update, setUpdate] = useState(null);
  const [inCall, setInCall] = useState(null);
  const [salePoints, setSalePoints] = useState(null);
  const [location, setLocation] = useState(null);
  const [Peticiones, setPeticiones] = useState([]);

  useEffect(() => {
    if (!salePoints) {
      apiGet('sale-points').then((result) => setSalePoints(
        { result },
      ));
    }
    if (!stores) {
      apiGet('stores').then((result) => setStores(
        { result },
      ));
    }
    setUpdate(true);
  }, [salePoints, stores]);

  useEffect(() => {
    if (update && stores && salePoints) {
      setUpdate(false);
      salePoints.result.map((salePoint) => {
        const store = stores.result.find((u) => u.id === salePoint.storeId);
        // eslint-disable-next-line no-param-reassign
        salePoint.storeName = store.name;
        return salePoint;
      });
    }
  }, [update, stores, salePoints]);

  useEffect(() => {
    socket.on('llegada_peticion', (id_client_socket)=> {
      setPeticiones([...Peticiones, id_client_socket]);
    });
  }, [Peticiones]);

  const soyAsistente = (id_sale_point) => {
    socket.emit('join_sala_asistente', id_sale_point);
  };

  const aceptarVideocall = (args) => {
    const arg_array = args.split(',');
    setInCall(true);
    setPeticiones([]);
    socket.emit('accept_videocall', arg_array[0], arg_array[1]);
    socket.emit('join_to_videocall_room', arg_array[1]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeLocation = (event) => {
    soyAsistente(event.target.value);
    setLocation(event.target.value);
  };

  return (
    <div >
      { inCall ? <VideoChat stopCall ={() => setInCall(false) }/>
        : <><FormControl variant="outlined" className={classes.location}>
          <h3 className={classes.location}>Selecciona el punto de venta</h3>
        { !salePoints ? <></>
          : <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={location}
              className={classes.location}
              onChange={handleChangeLocation}
          >
          { salePoints.result.map(
            (salePointOrdered) => < option className={classes.option}
                                           key={salePointOrdered.id}
                                            value={salePointOrdered.id} >
                                      {salePointOrdered.storeName} {salePointOrdered.id}
                                    </option>,
          )
          }
          </Select>
        }
      </FormControl>
      <div >
        { Peticiones.length === 0 ? <></>
          : <div className={classes.request}>
              <h3>Solicitudes de asistencia</h3>
              <div>
                Tienes una solicitud de asistencia en el local
              </div>
              <button key={Peticiones[0]}
                                value = {[Peticiones[0], location]}
                                onClick={(e) => aceptarVideocall(e.target.value)}>
                                Atender a cliente
              </button>
            </div>
        }
      </div>
      <Tabs
      variant="scrollable"
      scrollButtons="on"
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      className={classes.tab}
      >
        <Tab label="Atención de Tiendas" />
        <Tab label="Estado de dispositivos" />
        <Tab label="Asignar Tiendas" />
      </Tabs>
      <Grid
      container
      spacing={0}
      className={classes.menu}
      >
        <Container xs={12} sm={6} md={4} >
            <Paper >
                { value === 0 ? <LocationList /> : <div/> }
                { value === 1 ? <StoreList /> : <div/> }
                { value === 2 ? <UserList /> : <div/> }
                </Paper>
        </Container>
      </Grid>
     </>
     }
    </div>
  );
}
