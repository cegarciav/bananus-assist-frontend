import React from 'react';
import DevicesList from './location_devices';

export default function StoreList() {

  return (
    <div style={{ minHeight: '100vh' }} >
        <DevicesList store="Tienda 1"/>
        <DevicesList store="Tienda 2" />
        <DevicesList store="Tienda 3"/>
    </div>
  );
}