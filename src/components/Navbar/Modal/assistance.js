import React from 'react';
import useStyles from './styles-modal';
import assistance from '../../../assets/assistance.png';
import information from '../../../assets/information.png';

const Assistance = (props) => {
  const classes = useStyles();

  /**
   * Dentro de las props debería venir la respuesta de
   * la bbdd a la consulta de asistentes disponibles
   */

  const available = 1;

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
          <h2 id="simple-modal-title">No hay asistentes disponibles</h2>
          <p id="simple-modal-description">
            Lamentablemente no contamos con asistentes disponibles en este momento.
             Lo invitamos a revisar la guía del sistema o seguir consultando el
             catálogo de productos.
          </p>
          <button className={classes.close} onClick={props.hideModal}>Cerrar</button>
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => <Assistance {...props} forwardedRef={ref} />);
