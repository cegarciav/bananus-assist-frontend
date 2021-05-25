import React from 'react';
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

function Navbar() {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(selectUser);
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);
  const [location, setLocation] = React.useState(null);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleOpenModal = () => {
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
                {
                    location ? <Typography className={classes.location}>
                                    Punto de venta: {location}
                                </Typography >
                      : <FormControl variant="outlined" className={classes.location}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={location}
                                className={classes.location}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Location1</MenuItem>
                                <MenuItem value={2}>Location2</MenuItem>
                                <MenuItem value={3}>Location3</MenuItem>
                            </Select>
                        </FormControl>
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
                                            <Link to='/backoffice' className={classes.link}>
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
                    <button type="button" onClick={handleOpenModal} className={classes.assistButton}>
                          &#x2706; Solicitar asistencia
                    </button>
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
