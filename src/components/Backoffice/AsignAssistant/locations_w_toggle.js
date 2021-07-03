import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import useStyles from './styles-locations_w_toggle';
import { apiGet } from '../../../services/api-service';

function generate(element) {
  return [0, 1, 2].map((value) => React.cloneElement(element, { key: value }));
}

/*

             {user.stores.map((store) => (
                   <ListItem key = {store.id}>
                   <ListItemAvatar>
                     <Avatar>
                       <LocalGroceryStoreIcon />
                     </Avatar>
                   </ListItemAvatar>
                   <ListItemText primary={store.name} />
                   <ListItemSecondaryAction>
                     <Switch edge="end" />
                   </ListItemSecondaryAction>
                 </ListItem>

                ))}

*/
export default function LocationListToggle(props) {
  const classes = useStyles();
  // eslint-disable-next-line object-curly-newline
  const { userName, email, rol, userStores } = props;
  const [stores, setStores] = useState(null);

  useEffect(() => {
    if (!stores) {
      apiGet('stores')
        .then((result) => {
          if (result) setStores({ result });
        });
    }
  }, [stores]);

  return (
    <div >
      <Card >
        <CardHeader className={classes.cardHeader} title = {userName} subheader='Asignar Tiendas' />
        <CardContent className={classes.cardContent} >
          <Grid container direction="column" spacing={3} className={classes.gridContainer} >
            <Grid item xs={9} md={11} className={classes.grid} >
              <div>
                <List >
                {!stores ? <></>
                  : <>
                  {stores.result.map((store) => ( 
                      <ListItem key = {store.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <LocalGroceryStoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={store.name} />
                      <ListItemSecondaryAction>
                        <Switch edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                   </>
              }
                </List>
              </div>
            </Grid>
            <Grid item className={classes.grid}>
              <Button color="primary" variant="contained" type="submit">Guardar Cambios</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
