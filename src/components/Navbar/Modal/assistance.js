import React from 'react';
import useStyles from './styles-modal';
import assistance from '../../../assets/assistance.png';
import information from '../../../assets/information.png';

const Assistance = (props) => {
  const classes = useStyles();
  const available = props.state;

  if (available === 1) {
    return (
      <div className={classes.paperContainer}>
        <div className={classes.paper}>
            <img className={classes.img} src={assistance} alt="Logo" />
            <h2 id="simple-modal-title">Hay asistentes disponibles</h2>
            <p id="simple-modal-description">
      Porfavor, acerquese al tablet central, un asistente estará esperando a que inicie la llamada.
            </p>
            <button className={classes.close} onClick={props.hideModal}>Cerrar</button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.paperContainer}>
      <div className={classes.paper}>
          <img className={classes.img} src={information} alt="Logo" />
          <h2 id="simple-modal-title">Espere unos minutos</h2>
          <p id="simple-modal-description">
            Su solicitud fue recibida por los asistentes, espere unos minutos.
            En caso de que demore más de 5 mínutos le pedimos que porfavor realice una
            nueva solicitud. Puede acceder al botón de informaciones para conocer del
            sistema o seguir viendo los productos de la tienda.
          </p>
          <button className={classes.close} onClick={props.hideModal}>Cerrar</button>
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => <Assistance {...props} forwardedRef={ref} />);
