import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LocationListToggle from './locations_w_toggle';
import useStyles from './styles-assign_page';

export default function AsignPage(props) {
  const classes = useStyles(props);
  const location = useLocation();
  const userName = location.state.user;
  const { email } = location.state;
  const { rol } = location.state;
  const { stores } = location.state;

  return (
    <div >
      <Grid
      className={classes.item}
      container
      >
        <Container maxWidth="sm">
            <LocationListToggle
            userName = {userName}
            email = {email} rol = {rol}
            userStores = {stores}
            >
            </LocationListToggle>
        </Container>
      </Grid>
    </div>
  );
}
