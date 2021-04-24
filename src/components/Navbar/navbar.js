import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    link:{
         textDecoration: 'none', 
         color: 'black',
         fontSize: 16,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

  }));

function Navbar(props) {

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);

    const handleChange = (event) => {
        setAuth(event.target.checked);
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
                                    <MenuItem onClick={handleClose2}>Asistentes</MenuItem>
                                    <MenuItem onClick={handleClose2}>Tiendas</MenuItem>
                                    <MenuItem onClick={handleClose2}>Puntos de venta</MenuItem>
                                    <MenuItem onClick={handleClose2}>
                                        <Typography variant="p">
                                             <Link to='/Catalog' className={classes.link}> Catálogo </Link>
                                        </Typography >
                                    </MenuItem>
                                    <MenuItem onClick={handleClose2}>
                                        <Typography variant="p">
                                             <Link to='/' className={classes.link}> Home </Link>
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
                                    <MenuItem onClick={handleClose}>Iniciar sesión</MenuItem>
                                    <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
                                </Menu>
                            </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
	    );
	}

export default Navbar;