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
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import LocationList from './Locations/locations';
import StoreList from './Locations/store_list';
import ProductList from './Products/products-list';
import AssistantList from './AsignAssistant/assistant-list';
import Statistics from './statistics';
import UserList from './AsignAssistant/user-list';
import VideoChat from './video-chat';
import useStyles from './styles-menu';
import { apiGet, apiPatch, apiPost } from '../../services/api-service';
import socket from '../socket';
import { selectUser } from '../../features/userSlice';

export default function Backoffice(v) {
  let val;
  if (v.history.location.state === 2) {
    val = 2;
  } else {
    val = 0;
  }
  const email = Cookies.get('email');
  const [value, setValue] = useState(val);
  const classes = useStyles();
  const [stores, setStores] = useState(null);
  const [assistantStores, setAssistantStores] = useState([]);
  const [update, setUpdate] = useState(null);
  const [inCall, setInCall] = useState(null);
  const [salePoints, setSalePoints] = useState(null);
  const [location, setLocation] = useState(null);
  const [reconocimiento, setReconocimiento] = useState(false);
  const [Peticiones, setPeticiones] = useState([]);
  const history = useHistory();
  const user = useSelector(selectUser);

  const callUser = (idSocket) => {
    socket.emit('assistant_alert', idSocket, 'Hay un asistente disponible para atenderte, pide asistencia para contacto');
  };

  useEffect(() => {
    socket.on('face-detected_assistant', (idSocket) => {
      setReconocimiento(true);
      callUser(idSocket);
    });
  }, reconocimiento);

  useEffect(() => {
    apiPost('users/show', JSON.stringify({ email })).then((result) => {
      if (result.stores) {
        const arr = [];
        result.stores.forEach((store) => {
          arr.push(store.id);
        });
        setAssistantStores(arr);
      }
    });
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
        if (!store) {
          return null;
        // eslint-disable-next-line no-else-return
        } else {
        // eslint-disable-next-line no-param-reassign
          salePoint.storeName = store.name;
          return salePoint;
        }
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
    apiPatch('assistants');
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
            (salePointOrdered) => (assistantStores.includes(salePointOrdered.storeId)
              ? < option className={classes.option}
                                           key={salePointOrdered.id}
                                            value={salePointOrdered.id} >
                                      {salePointOrdered.storeName} / {salePointOrdered.department}
                                    </option> : null),
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
      {
        user.rol === 'administrator' || user.rol === 'supervisor'
          ? <>
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
              <Tab label="Productos" />
              <Tab label="Asistentes" />
              <Tab label="Estad??sticas" />
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
                  { value === 3 ? <ProductList /> : <div/> }
                  { value === 4 ? <AssistantList /> : <div/> }
                  { value === 5 ? <Statistics /> : <div/> }
                </Paper>
              </Container>
            </Grid>
          </>
          : <h3 className={classes.location}>Esperando solicitud de asistencia...</h3>
      }
     </>
     }
    </div>
  );
}
