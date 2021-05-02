import React from 'react';
import Container from '@material-ui/core/Container';
import LocationListToggle from './locations_w_toggle';
import Grid from '@material-ui/core/Grid';

export default function AssignPage( props ) {
  
  const userId = props.match.params.userId;

  const users = {
    1 : {name: 'Pedro Perez'} ,
    2 : {name: 'Pablo Perez'} ,

}
  const user = users[userId];

  return (
    <div >
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
      >
        <Container maxWidth="sm">
            <LocationListToggle employee={user}>
            </LocationListToggle>
        </Container>
      </Grid> 
    </div>
  );
}