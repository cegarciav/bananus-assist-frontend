import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import DeviceStatus from './device_status';
import useStyles from './styles-location_devices';

export default function DevicesList(props) {
  const classes = useStyles();
  // add one
  return (
    <div >
        <Card>
            <CardHeader title={props.props[0].storeName} subheader='Estado de dispositivos' className={classes.cardHeader} />
            <Divider />
            <CardContent className={classes.cardContent } >
            <Grid container>
                <Grid alginItems='center' item xs={11} md={11} className={classes.grid }>
                <div>
                    <List>
                    {
                     props.props.map((element) => <DeviceStatus device=
                     { { isOn: true, name: element.department, id: element.id }}
                     key={element.id} />)
                    }
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
