import React, { useState, useEffect } from 'react';
import DevicesList from './location_devices';
import useStyles from './styles-store_list';
import { apiGet } from '../../../services/api-service';

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export default function StoreList() {
  const classes = useStyles();
  const [salePoints, setSalePoints] = useState(null);
  const [salePointsOrdered, setSalePointsOrdered] = useState([]);
  const [stores, setStores] = useState(null);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    if (!salePoints) {
      apiGet('sale-points').then((result) => setSalePoints(
        { result },
      ));
    }
    if (!stores) {
      apiGet('stores').then((result) => setStores(
        { result },
      ));
    }
    setUpdate(true);
  }, [salePoints, stores]);

  useEffect(() => {
    if (update && stores && salePoints) {
      setUpdate(false);
      const ordered = salePoints.result.map((salePoint) => {
        const store = stores.result.find((u) => u.id === salePoint.storeId);
        // eslint-disable-next-line no-param-reassign
        salePoint.storeName = store.name;
        return salePoint;
      });
      const result = groupBy(ordered, 'storeName');
      const array = [];
      for (var key in result ) {
        array.push(result[key]);
      };
      setSalePointsOrdered(array);
    }
  }, [update, stores, salePoints]);

  return (
      <div style={{ minHeight: '100vh' }} className={classes.item}>
        {!salePointsOrdered ? <></>
          : <>
              {
                salePointsOrdered.map((element) => <DevicesList props={element} key={element.id} />)
              }
            </>
      }
      </div>
  );
}
