import React, { useState } from 'react';
import useStyles from './styles-modal';
import { apiPostMassiveUpload } from '../../../../services/api-service';
// masive-charge

const UploadProduct = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState({ selectedFile: null });
  const [errors, setErrors] = useState([]);

  const onFileChange = (event) => {
    setFile({ selectedFile: event.target.files[0] });
    setErrors([]);
  };

  const uploadProducts = () => {
    const fromdata = new FormData();
    fromdata.append('excel', file.selectedFile, 'excel');
    apiPostMassiveUpload('massive_charge', fromdata).then((e) => console.log(e));
    props.reload();
    setFile({ selectedFile: null });
  };

  const fileData = () => {
    if (file.selectedFile && errors.length === 0) {
      return (
            <div>
              <h2>Detalles del archivo:</h2>
              <p>Nombre del archivo: {file.selectedFile.name}</p>
            </div>
      );
    }
    if (errors.length > 1) {
      return (
        <div className={classes.fail}>
          Las columnas con problemas son las siguientes:
          <div>
          </div>
        </div>
      );
    }
    if (errors.length === 1) {
      return (
            <div className={classes.success}>
              Se ha cargado con éxito el archivo.
            </div>
      );
    }
    return (
         <div>
              <br />
              <h4>Elige un archivo excel (.xlxs)</h4>
          </div>
    );
  };
  const buttons = () => {
    if (file.selectedFile && errors.length === 0) {
      return (
            <div>
              <button className={classes.delete} onClick={props.hideModal}>
                No, no estoy seguro
              </button>
               <button className={classes.close} onClick={uploadProducts}>
                   Realizar carga masiva
               </button>
            </div>
      );
    }
    if (errors.length >= 1) {
      return (
      <div>
        <button className={classes.close} onClick={props.hideModal}>
          Salir
        </button>
      </div>
      );
    }
    return (
      <div>
        <button className={classes.delete} onClick={props.hideModal}>
          No, no estoy seguro
        </button>
         <button className={classes.close} onClick={uploadProducts}>
             Realizar carga masiva
         </button>
      </div>
    );
  };
  return (
    <div className={classes.paperContainer}>
      <div className={classes.paper}>
          <h2 id="simple-modal-title">Estas seguro que quiere eliminar los  productos seleccionados</h2>
          <p id="simple-modal-description">
            Al eliminar estos productos se perderá toda la información asociada a ellos.
          </p>
          <div>
            <div>
                <input type="file" onChange={onFileChange} accept=".xlsx" />
            </div>
          {fileData()}
        </div>
        {buttons()}
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => <UploadProduct {...props} forwardedRef={ref} />);
