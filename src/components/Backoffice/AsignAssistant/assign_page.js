import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import LocationListToggle from './locations_w_toggle';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles-assign_page";

export default function AsignPage(props) {

  const classes = useStyles(props);
  const location = useLocation();
  const user_ = location.state.user;

  return (
    <div >
      <Grid
      className={classes.item}
      container
      >
        <Container maxWidth="sm">
            <LocationListToggle name = {user_} >
            </LocationListToggle>
        </Container>
      </Grid>
    </div>
  );
}