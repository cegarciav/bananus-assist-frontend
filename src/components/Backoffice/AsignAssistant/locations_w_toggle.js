import React from 'react';
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
import useStyles from "./styles-locations_w_toggle";


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function LocationListToggle(user) {

  const classes = useStyles();
  return (
    <div >
        <Card >
            <CardHeader className={classes.cardHeader} title={user.name} subheader='Asignar Tiendas' />
            <CardContent className={classes.cardContent} >
            <Grid container direction="column" spacing={3} className={classes.gridContainer} >
                <Grid item xs={9} md={11} className={classes.grid} >
                <div>
                    <List >
                    {generate(
                        <ListItem >
                        <ListItemAvatar>
                            <Avatar>
                            <LocalGroceryStoreIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Generic Store Location Name"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                            />
                        </ListItemSecondaryAction>
                        </ListItem>,
                    )}
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
