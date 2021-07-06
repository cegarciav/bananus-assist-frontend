import React from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
 console.log(props.data);
  return (
    <div >
      <Line data={props.data} />
    </div>
  );
}
