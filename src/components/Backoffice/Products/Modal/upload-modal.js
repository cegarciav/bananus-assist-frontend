import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles-modal';
import { apiPostMassiveUpload } from '../../../../services/api-service';

const UploadProduct = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState({ selectedFile: null });
  const [errors, setErrors] = useState([]);
  const [upload, setUpload] = useState(false);
  const excelPage = { product: 'Productos', tech_char: 'Características técnicas', payment_method: 'Medios de pago' };

  const onFileChange = (event) => {
    setFile({ selectedFile: event.target.files[0] });
    setErrors([]);
    setUpload(true);
  };

  const uploadProducts = () => {
    if (file.selectedFile) {
      const fromdata = new FormData();
      fromdata.append('excel', file.selectedFile, 'excel');
      apiPostMassiveUpload('massive-charge', fromdata).then((e) => setErrors(e.failed_products));
      props.reload();
    }
    setFile({ selectedFile: null });
  };

  const closeModal = () => {
    setUpload(false);
    setErrors([]);
    setFile({ selectedFile: null });
    props.hideModal();
    props.reload();
  };

  const fileData = () => {
    if (file.selectedFile && errors.length === 0) {
      return (
            <Alert severity="info" className={classes.alert}>
              <h2>Detalles del archivo:</h2>
              <p>Nombre del archivo: {file.selectedFile.name}</p>
            </Alert>
      );
    }
    if (errors.length >= 1 && upload) {
      return (
          <Alert severity="error" className={classes.alert}>Las columnas con problemas son las siguientes:
          {errors.map((error, index) => <p key={index} >
          La columna {error.key} de la hoja de {excelPage[error.type]}
          </p>)}
          </Alert>
      );
    }
    if (upload && errors.length === 0) {
      return (
            <Alert severity="success" className={classes.alert}> Se ha cargado con éxito el archivo.</Alert>
      );
    }
    return (
          <Alert severity="warning" className={classes.alert} >Elige un archivo excel (.xlxs)</Alert>
    );
  };
  const buttons = () => {
    if (file.selectedFile && errors.length === 0) {
      return (
            <div>
              <button className={classes.delete} onClick={closeModal}>
                No, no estoy seguro
              </button>
               <button className={classes.close} onClick={uploadProducts}>
                   Realizar carga masiva
               </button>
            </div>
      );
    }
    if (errors.length >= 1 || upload) {
      return (
      <div>
        <button className={classes.close} onClick={closeModal}>
          Salir
        </button>
      </div>
      );
    }
    return (
      <div>
        <button className={classes.delete} onClick={closeModal}>
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
          <h2 id="simple-modal-title">Carga masiva de productos</h2>
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
