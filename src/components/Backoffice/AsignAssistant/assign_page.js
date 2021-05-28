import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LocationListToggle from './locations_w_toggle';
import useStyles from './styles-assign_page';

export default function AsignPage(props) {
  const classes = useStyles();
  const { userId } = props.match.params;

  const users = {
    1: { name: 'Pedro Perez' },
    2: { name: 'Pablo Perez' },
  };

  const user = users[userId];

  return (
    <div >
      <Grid
      className={classes.item}
      container
      >
        <Container maxWidth="sm">
            <LocationListToggle employee={user}>
            </LocationListToggle>
        </Container>
      </Grid>
    </div>
  );
}
