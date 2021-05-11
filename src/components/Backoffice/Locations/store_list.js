import React from 'react';
import DevicesList from './location_devices';
import useStyles from './styles-store_list';

export default function StoreList() {

  const classes = useStyles();

  return (
    <div style={{ minHeight: '100vh' }} className={classes.item}  >
        <DevicesList store="Tienda 1"/>
        <DevicesList store="Tienda 2" />
        <DevicesList store="Tienda 3"/>
    </div>
  );
}