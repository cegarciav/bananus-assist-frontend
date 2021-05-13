import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from "./styles-navbar";
import Assistance from "./Modal/assistance";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice'
import { useSelector } from "react-redux";
import { selectUser } from '../../features/userSlice';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';


function Navbar(props) {

    const classes = useStyles();
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const user = useSelector(selectUser);
    const history = useHistory();
    const [openModal, setOpenModal] = React.useState(false);

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

    const handleLogIn = (e) => {
        history.push("/login");
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
                                    {user ? 
                                        <>
                                            <MenuItem onClick = {(e) => handleLogout(e)} >Cerrar sesión</MenuItem> 
                                            <Link to='/backoffice' className={classes.link}>
                                                <MenuItem onClick={handleClose2}>
                                                   <Typography >
                                                        Home 
                                                    </Typography>
                                                </MenuItem>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <MenuItem onClick = {(e) => handleLogIn(e)}  > Iniciar sesión</MenuItem> 
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
                         <Assistance />
                    </Modal>
                </Toolbar>
            </AppBar>
        </div>
	    );
	}

export default Navbar;