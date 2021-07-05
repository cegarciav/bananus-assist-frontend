import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ShowStoreToggle from './show_store';
import useStyles from './styles-show-store';

export default function ShowStorePage(props) {
  const classes = useStyles(props);
  const location = useLocation();
  const store = location.state.store_prop;
  return (
    <div >
      <Grid
      className={classes.item}
      container
      >
        <Container maxWidth="sm">
            <ShowStoreToggle store = {store} >
            </ShowStoreToggle>
        </Container>
      </Grid>
    </div>
  );
}
