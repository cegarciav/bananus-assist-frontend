import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import DeviceStatus from './device_status';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles-location_devices';

export default function DevicesList(props) {
  const classes = useStyles();

  return (
    <div >
        <Card>
            <CardHeader title={props.store} subheader='Estado de dispositivos' className={classes.cardHeader} />
            <Divider />
            <CardContent className={classes.cardContent } >
            <Grid container>
                <Grid alginItems='center' item xs={11} md={11} className={classes.grid }>
                <div>
                    <List>
                        <DeviceStatus device={ { isOn: true, name: 'Tablet central' } }/>
                    </List>
                    <List>
                        <DeviceStatus device={ { isOn: false, name: 'Tablet catalogo 1' }}/>
                    </List>
                    <List>
                        <DeviceStatus device={ { isOn: true, name: 'Tablet catalogo 2' }}/>
                    </List>
                </div>
                </Grid>
            </Grid>
            </CardContent>
            <Divider />
        </Card>
    </div>
  );
}