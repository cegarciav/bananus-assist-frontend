import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
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
  const [reconocimiento, setReconocimiento] = useState(false);
  const [Peticiones, setPeticiones] = useState([]);
  const history = useHistory();

  const call_user = (id_socket) => {
    socket.emit("assistant_alert", id_socket, "Hay un asistente disponible para atenderte, pide asistencia para contacto");
  }

  useEffect(() => {
    socket.on("face-detected_assistant", (id_socket) => {
      setReconocimiento(true)
      call_user(id_socket)
    })
  }, reconocimiento)

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
    socket.on('llegada_peticion', (idClientSocket) => {
      setPeticiones([...Peticiones, idClientSocket]);
    });
  }, [Peticiones]);

  const soyAsistente = (idSalePoint) => {
    socket.emit('join_sala_asistente', idSalePoint);
  };

  const aceptarVideocall = (args) => {
    const argArray = args.split(',');
    setInCall(true);
    setPeticiones([]);
    socket.emit('accept_videocall', argArray[0], argArray[1]);
    socket.emit('join_to_videocall_room', argArray[1]);
    // eslint-disable-next-line no-restricted-globals
    history.push({
      pathname: '/videocall/'.concat(location),
      state: { location },
    });
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
      <div className={classes.alert}>
        { Peticiones.length === 0 ? <></>
          : <Alert severity="info">Tienes una solicitud de asistencia
                <button className={classes.request_btn} key={Peticiones[0]}
                                    value = {[Peticiones[0], location]}
                                    onClick={(e) => aceptarVideocall(e.target.value)}>
                                    Atender a cliente
                </button>
            </Alert>
        }
      </div>
      <div>
      { !reconocimiento ? <></>
          : <Alert severity="info">Clientes detectados
                <button className={classes.request_btn} 
                                    onClick={() => setReconocimiento(false)}>
                                    Cerrar
                </button>
            </Alert>
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
        <Tab label="Tiendas" />
        <Tab label="Puntos de venta" />
        <Tab label="Usuarios" />
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
