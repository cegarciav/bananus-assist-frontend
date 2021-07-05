import React, { useEffect, useState } from 'react';
import useStyles from './styles-modal';
import { apiDelete } from '../../../../services/api-service';

const DeleteProduct = (props) => {
  const classes = useStyles();
  const count = props.productsToDelete.length;
  const [reload , setReload] = useState(false);

  async function callDeleteAPI(sku) {
    const body = { sku };
    const response = await apiDelete('products', JSON.stringify(body), null).then(setReload(true));
  }

  const deleteProducts = () => {
    props.productsToDelete.forEach((element) => callDeleteAPI(element.sku));
    props.reload();
    props.hideModal();
  };

  useEffect(() => {
    if (!reload) {
      props.reload();
    }
    setReload(false);
  }, [reload]);

  if (count === 0) {
    return (
        <div className={classes.paperContainer}>
          <div className={classes.paper}>
              <h2 id="simple-modal-title">No has seleccionado ningún producto</h2>
              <button className={classes.close} onClick={props.hideModal}>Cerrar</button>
          </div>
        </div>
    );
  }

  return (
    <div className={classes.paperContainer}>
      <div className={classes.paper}>
          <h2 id="simple-modal-title">Estas seguro que quiere eliminar los {count} productos seleccionados</h2>
          <p id="simple-modal-description">
            Al eliminar estos productos se perderá toda la información asociada a ellos.
          </p>
          <button className={classes.close} onClick={props.hideModal}>No, no estoy seguro</button>
          <button className={classes.delete} onClick={deleteProducts}>
              Si, los quiero eliminar
          </button>
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => <DeleteProduct {...props} forwardedRef={ref} />);
