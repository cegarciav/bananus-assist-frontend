/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles-locations_w_toggle';
import { apiGet, apiPost, apiDelete } from '../../../services/api-service';
import Menu from '../menu';

function isStore(userStores, storeAddress) {
  for (let i = 0; i < userStores.length; i++) {
    if (userStores[i] === storeAddress) {
      return i;
    }
  }
  return -1;
}

export default function LocationListToggle(props) {
  // Todo: solo supervisores pueden cambiar
  const classes = useStyles();
  // eslint-disable-next-line object-curly-newline
  const { userName, email, rol, userStores } = props;
  const [stores, setStores] = useState(null);
  const [sucess, setSucess] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const userStoresAddress = [];

  for (let i = 0; i < userStores.length; i++) {
    userStoresAddress.push(userStores[i].address);
  }
  const [storesAds, setAds] = useState(userStoresAddress);

  useEffect(() => {
    if (!stores) {
      apiGet('stores')
        .then((result) => {
          if (result) setStores({ result });
        });
    }
  }, [stores]);

  const handleToggle = (value) => () => {
    const currentIndex = isStore(storesAds, value.address);
    // eslint-disable-next-line prefer-const
    let aux = [];

    for (let i = 0; i < storesAds.length; i++) {
      aux.push(storesAds[i]);
    }

    if (currentIndex === -1) {
      aux.push(value.address);
    } else {
      aux.splice(currentIndex, 1);
    }
    setAds(aux);
  };
  const handleSubmit = () => () => {
    if (rol === 'assistant') {
      for (let i = 0; i < stores.result.length; i++) {
        const body = JSON.stringify({
          address: stores.result[i].address,
          email,
        });
        if (isStore(storesAds, stores.result[i].address) === -1) {
          apiDelete('assistants', body);
        } else {
          apiPost('assistants', body);
        }
      }
      setSucess(1);
      setOpen(true);
    } else {
      setSucess(-1);
    }
  };

  const goBack = () => () => {
    history.push('/backoffice', 2);
  };

  return (
    <div>
      { sucess === 1
        ? <Collapse in={open}>
        <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setSucess(null);
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        Asistente asignado correctamente!
      </Alert>
      </Collapse>
        : <div/>
      }
      {rol === 'assistant'
        ? <Card >
        <CardHeader className={classes.cardHeader} title = {userName} subheader='Asignar Tiendas' />
        <CardContent className={classes.cardContent} >
          <Grid container direction="column" spacing={3} className={classes.gridContainer} >
            <Grid item xs={9} md={11} className={classes.grid} >
              <div>
                <List >
                {!stores ? <></>
                  : <>
                  {stores.result.map((store) => (
                      <ListItem key = {store.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <LocalGroceryStoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={store.name} />
                      <ListItemSecondaryAction>
                        <Switch
                        edge="end"
                        checked = {isStore(storesAds, store.address) !== -1}
                        onChange = {handleToggle(store)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                   </>
              }
                </List>
              </div>
            </Grid>
            <Grid item className={classes.grid}>
              <Button className = {classes.btn} color="primary" variant="contained" onClick = {handleSubmit()} type="submit">Guardar Cambios </Button>
              <Button className={classes.btn} color="primary" variant="contained" onClick = {goBack()} type="submit">Volver </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
        : <Card >
        <CardHeader className={classes.cardHeader} title = {userName} subheader={rol} />
        <CardContent className={classes.cardContent} >
          <Grid container direction="column" spacing={3} className={classes.gridContainer} >
          <Grid item className={classes.text}>
              <text>Correo: {email}</text>
            </Grid>
            <Grid item className={classes.grid}>
              <Button className={classes.btn} color="primary" variant="contained" onClick = {goBack()} type="submit">Volver </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
}
    </div>
  );
}
