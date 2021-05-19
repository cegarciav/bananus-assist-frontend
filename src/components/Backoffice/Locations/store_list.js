import React, { useState, useEffect } from 'react';
import DevicesList from './location_devices';
import useStyles from './styles-store_list';
import { apiGet } from '../../../services/api-service';

export default function StoreList() {
  const classes = useStyles();
  const [stores, setStores] = useState(null);

  useEffect(() => {
    if (!stores) {
      apiGet('stores').then((result) => setStores(
        { result },
      ));
    }
  }, [stores]);

  if (!stores) {
    return(
      <>
      Loading...
    </>
    )
  }
  else{
    console.log(stores);
    return (
      <div style={{ minHeight: '100vh' }} className={classes.item}>
          <DevicesList store="Tienda 1"/>
          <DevicesList store="Tienda 2" />
          <DevicesList store="Tienda 3"/>
      </div>
    );
  }
};