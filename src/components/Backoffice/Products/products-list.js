import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import DeleteProduct from './Modal/delete-product';
import UploadProduct from './Modal/upload-modal';
import { apiGet } from '../../../services/api-service';
import useStyles from './styles-products-list';

export default function ProductList() {
  const [products, setProducts] = useState(null);
  const classes = useStyles();
  const [reload, setReload] = useState(false);
  const [checked, setChecked] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenUploadModal = () => {
    setOpenUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    if (!products || reload) {
      apiGet('products')
        .then((result) => {
          setProducts(result);
        });
    }
    setReload(false);
  }, [products, reload]);

  return (
      <div style={{ minHeight: '100vh' }}>
          <button
            onClick={() => handleOpenUploadModal()}
            className={classes.delete}
          >
              Carga masiva
          </button>
          <button
            onClick={() => handleOpenModal()}
            className={classes.delete}
          >
              Delete
          </button>
          {
            !products ? <></>
              : <List dense className={classes.root}>
              <h2 className={classes.header} > Hay {products.length} productos</h2>
              {products.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} button>
                      <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                          className={classes.checkbox}
                      />
                      <ListItemAvatar>
                      <Avatar
                          alt={value.image}
                          src={value.image}
                      />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={value.name} />
                  </ListItem>
                );
              })}
           </List>
          }
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            >
            <DeleteProduct
              hideModal ={() => setOpenModal(false) }
              productsToDelete = {checked}
              reload = {() => setReload(true)}
            />
          </Modal>
          <Modal
            open={openUploadModal}
            onClose={handleCloseUploadModal}
            >
            <UploadProduct
              hideModal ={() => setOpenUploadModal(false) }
              reload = {() => setReload(true)}
            />
          </Modal>
      </div>
  );
}
