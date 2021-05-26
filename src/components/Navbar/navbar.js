import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import { Link, useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles-navbar';
import Assistance from './Modal/assistance';
import { logout, selectUser } from '../../features/userSlice';
import { apiGet } from '../../services/api-service';
import socket from '../socket';

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
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
  const [location, setLocation] = React.useState(null);
  const [Peticiones, SetPeticiones] = useState([]);
  const [stores, setStores] = useState(null);
  const [update, setUpdate] = useState(null);
  const [salePoints, setSalePoints] = useState(null);

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
        // eslint-disable-next-line no-param-reassign
        salePoint.storeName = store.name;
        return salePoint;
      });
    }
  }, [update, stores, salePoints, location]);

  useEffect(() => {
    socket.on('llegada_peticion', (idClientSocket) => {
      SetPeticiones([...Peticiones, idClientSocket]);
    });
  }, [Peticiones]);

  const peticion = (idSalePoint) => {
    socket.emit('peticion_asistentes', idSalePoint);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleOpenModal = (e) => {
    peticion(e.target.value);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
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

  return (
        <div>
            <AppBar position="static" >
                <Toolbar className={classes.navbar}>
                { user ? <></>
                  : <>{ location ? <Typography className={classes.location}>
                                    <h3>Punto de venta:</h3>
                                    <p>{location}</p>
                                </Typography >
                    : <FormControl variant="outlined" className={classes.location}>
                         { (!salePoints && !user) ? <></>
                           : <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={location}
                                className={classes.location}
                                onChange={handleChange}
                            >
                                { salePoints.result.map(
                                  (salePointOrdered) => <option className={classes.option}
                                                                key={salePointOrdered.id}
                                                                value={salePointOrdered.id} >
                                                 {salePointOrdered.storeName} {salePointOrdered.id}
                                                        </option>,
                                )
                                }
                            </Select>
                        }
                        </FormControl>
                        } </>
                    }
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
                                    <Link to='/Catalog' className={classes.link}>
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
                                                        Home
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
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                    >
                         <Assistance hideModal ={() => setOpenModal(false) } />
                    </Modal>
                </Toolbar>
            </AppBar>
        </div>);
}

export default Navbar;
