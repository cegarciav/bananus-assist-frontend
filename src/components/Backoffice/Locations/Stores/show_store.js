import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import useStyles from './styles-show-store';

export default function ShowStoreToggle(store) {
  /*To do: ver supervisores y asistentes. Redirigir a Update o ver si es mejor ponerlo ahi en la lista. */
  const classes = useStyles();
  const current_store = store.store;
  return (
    <div >
      <Card >
        <CardHeader className={classes.cardHeader} title={current_store.name} subheader={current_store.address} />
        <CardContent className={classes.cardContent} >
          <Grid container direction="column" spacing={3} className={classes.gridContainer} >
            <Grid item xs={9} md={11} className={classes.grid} >
              <div>
                <List >
                    <ListItem >
                      <ListItemText primary="Supervisores:" />
                    </ListItem>
                    <ListItem >
                      <ListItemText primary="Asistentes:" />
                    </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item className={classes.grid}>
              <Button color="primary" variant="contained" type="submit">Editar Tienda</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
