/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import { Link, useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Cookies from 'js-cookie';
import useStyles from './styles-navbar';
import Assistance from './Modal/assistance';
import { logout, selectUser } from '../../features/userSlice';
import { apiGet } from '../../services/api-service';
import socket from '../socket';

// eslint-disable-next-line no-unused-vars
function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function Navbar() {
  const classes = useStyles();
  const [auth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(selectUser);
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = React.useState(null);
  const [Peticiones, SetPeticiones] = useState([]);
  const [stores, setStores] = useState(null);
  const [update, setUpdate] = useState(null);
  const [salePoints, setSalePoints] = useState(null);
  const [accepted, setAccepted] = useState(null);

  useEffect(() => {
    if (!salePoints && !location) {
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
  }, [salePoints, stores, location]);

  useEffect(() => {
    if (update && stores && salePoints && !location) {
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
  }, [update, stores, salePoints, location]);

  useEffect(() => {
    socket.on('llegada_peticion', (idClientSocket) => {
      SetPeticiones([...Peticiones, idClientSocket]);
    });
  }, [Peticiones]);

  useEffect(() => {
    socket.on('accept_call', () => {
      setAccepted(1);
      setOpenModal(true);
    });
  }, [accepted]);

  const peticion = (idSalePoint) => {
    socket.emit('peticion_asistentes', idSalePoint);
  };

  const handleOpenModal = () => {
    const value = Cookies.get('salePointId');
    peticion(value);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setAccepted(0);
    setOpenModal(false);
  };

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());

    const TOKEN_KEY = 'token';
    localStorage.removeItem(TOKEN_KEY);
    history.push('/catalog');
  };

  const handleLogIn = () => {
    history.push('/login');
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleInfo = () => {
    history.push('/information');
  };

  return (
        <div>
            <AppBar position="static" >
                <Toolbar className={classes.navbar}>
                    <div className={classes.item}>
                        {auth && (
                            <div className={classes.item}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu2}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl2}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    open={open2}
                                    onClose={handleClose2}
                                >

                                    <Link to = {{ pathname: '/Catalog', state: { location } }}
                                             className={classes.link}>

                                        <MenuItem onClick={handleClose2}>
                                            <Typography >
                                                Catálogo
                                            </Typography >
                                        </MenuItem>
                                    </Link>

                                </Menu>
                            </div>
                        )}
                    </div>
                        {auth && (
                            <div className={classes.item}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {user ? <>
                                        <MenuItem onClick = {(e) => handleLogout(e)} >
                                            Cerrar sesión
                                        </MenuItem>
                                            <Link to = {{ pathname: '/backoffice', state: { location } }}
                                             className={classes.link}>
                                                <MenuItem onClick={handleClose2}>
                                                   <Typography >
                                                        Administración
                                                    </Typography>
                                                </MenuItem>
                                            </Link>
                                        </>
                                      : <>
                                            <MenuItem onClick = {() => handleLogIn()} >
                                               Iniciar sesión
                                            </MenuItem>
                                        </>
                                    }
                                </Menu>
                            </div>
                        )}
                    {user ? <></>
                      : <button type="button" value = {location} onClick={(e) => handleOpenModal(e)} className={classes.assistButton}>
                           &#x2706; Solicitar asistencia
                        </button>
                    }

                    <IconButton className={classes.infoButton} aria-label="información" component="span"
                           onClick={handleInfo}
                    >
                          <InfoOutlinedIcon fontSize = "large"/>
                    </IconButton>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                    >
                         <Assistance hideModal ={() => setOpenModal(false) } state = {accepted} />
                    </Modal>
                </Toolbar>
            </AppBar>

        </div>
  );
}

export default Navbar;
