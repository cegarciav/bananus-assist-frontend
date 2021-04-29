import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from "./styles-navbar";
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


function Navbar(props) {

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const user = useSelector(selectUser);
    const history = useHistory();

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleLogIn = (e) => {
        history.push("/backoffice");
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
            <AppBar position="static" style={{backgroundColor: "#195E6D"}} >
                <Toolbar >
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
                                    {user ? 
                                    <>
                                        <MenuItem onClick={handleClose2}>Asistentes</MenuItem>
                                        <MenuItem onClick={handleClose2}>Tiendas</MenuItem>
                                        <MenuItem onClick={handleClose2}>Puntos de venta</MenuItem>
                                        <MenuItem onClick={handleClose2}></MenuItem>
                                    </>
                                    :
                                    <></>
                                    
                                }
                                    <MenuItem onClick={handleClose2}>
                                        <Typography variant="p">
                                             <Link to='/Catalog' className={classes.link}> Catálogo </Link>
                                        </Typography >
                                    </MenuItem>
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
                                    {user ? <MenuItem onClick = {
                                        (e) => handleLogout(e)} >Cerrar sesión</MenuItem> 
                                        :
                                         <MenuItem onClick = {(e) => handleLogIn(e)}  > Iniciar sesión</MenuItem> 
                                    }
                                </Menu>
                            </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
	    );
	}

export default Navbar;