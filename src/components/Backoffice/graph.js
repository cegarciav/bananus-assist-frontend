import React from 'react';
import { Line } from 'react-chartjs-2';

export default function Graph(props) {
  return (
    <div >
      <Line data={props.data} />
    </div>
  );
}
