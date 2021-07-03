import React, { useState } from 'react';
import useStyles from './styles-modal';
import { apiPost } from '../../../../services/api-service';
// masive-charge

const UploadProduct = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState({ selectedFile: null });
  const onFileChange = (event) => {
    setFile({ selectedFile: event.target.files[0] });
  };
  const uploadProducts = () => {
    const formData = new FormData();

    formData.append(
      'myFile',
      file.selectedFile,
      file.selectedFile.name,
    );
    apiPost('/masive-charge', null, null);
  };

  const fileData = () => {
    if (file.selectedFile) {
      return (
            <div>
              <h2>Detalles del archivo:</h2>
              <p>Nombre del archivo: {file.selectedFile.name}</p>
              <p>
                Ultima vez modificado:{''}
                {file.selectedFile.lastModifiedDate.toDateString()}
              </p>
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
                <button onClick={uploadProducts}>
                  Upload!
                </button>
            </div>
          {fileData()}
        </div>
          <button className={classes.close} onClick={props.hideModal}>No, no estoy seguro</button>
          <button className={classes.delete} onClick={uploadProducts}>
              Si, los quiero eliminar
          </button>
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => <UploadProduct {...props} forwardedRef={ref} />);
