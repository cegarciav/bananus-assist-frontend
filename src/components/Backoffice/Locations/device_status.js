import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';

export default function DeviceStatus(props) {
  // edit
  // delete
  return (
    <div >
        <ListItem>
            <ListItemText>
                {props.device.name}
            </ListItemText>
            <ListItemSecondaryAction>
                {props.device.isOn ? <WifiIcon edge="end" color="primary"/> : <WifiOffIcon edge="end" color="secondary"/> }
            </ListItemSecondaryAction>
        </ListItem>
    </div>
  );
}
