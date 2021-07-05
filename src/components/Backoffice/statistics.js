import React, { useState, useEffect } from 'react';
import { apiGet } from '../../services/api-service';

export default function Statistics() {
  const [data, setData] = useState();

  useEffect(() => {
    if (!data) {
      apiGet('kpis').then((result) => setData(
        result.data,
      ));
    }
  }, [data]);

  return (
    <div >
    </div>
  );
}
