import React from 'react';
import AcceptedCalls from './accepted-call';
import RequestedCalls from './requested-call';
import useStyles from './styles-statistics';

export default function Statistics() {
  const classes = useStyles();
  return (
    <div className="App">
    <div>
      <h2 className={classes.header}>Llamadas aceptadas por los asistentes</h2>
      <AcceptedCalls />
      <h2 className={classes.header}>Llamadas solicitadas por los clientes</h2>
      <RequestedCalls />
    </div>
  </div>
  );
}
