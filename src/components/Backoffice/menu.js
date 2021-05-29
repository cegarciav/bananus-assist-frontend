import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import LocationList from './Locations/locations';
import StoreList from './Locations/store_list';
import UserList from './AsignAssistant/user_list';
import useStyles from './styles-menu';

export default function Menu() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
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
    </div>
  );
}
