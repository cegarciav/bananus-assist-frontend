import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import CallIcon from '@material-ui/icons/Call';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Modal from '@material-ui/core/Modal';
import { apiGet } from '../../../services/api-service';
import AddStore from './Stores/add_store';
import useStyles from './styles-store_list';

export default function LocationList() {
  const classes = useStyles();
  const [stores, setStores] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (!stores) {
      apiGet('stores')
        .then((result) => {
          if (result) setStores({ result });
        });
    }
  }, [stores]);

  useEffect(() => {
    if (reload) {
      apiGet('stores')
        .then((result) => {
          if (result) setStores({ result });
          setReload(false);
        });
    }
  }, [reload]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenModal} className={classes.button} >
      + Agregar Tienda
          </button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
          >
            <AddStore close={handleCloseModal}
              hideModal ={() => setOpenModal(false) }
              reload ={() => setReload(true) }
            />
          </Modal>
    <div>
      <Grid container spacing={0}>
        <Grid item xs={11} md={11}>
          <div >
            <List >
              {!stores ? <></>
                : <>
                  {stores.result.map((store) => (
                     <Link
                     to={{
                       pathname: String('/backoffice/store/') + store.id,
                       state: {
                         store_prop: store,
                       },
                     }}
                     key = {store.id}
                   >
                    <ListItem key = {store.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <LocalGroceryStoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={store.name}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          {store.incoming_call ? <CallIcon color="primary" /> : <CallIcon /> }
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          {store.face_detected ? <EmojiEmotionsIcon color="primary" /> : <EmojiEmotionsIcon /> }
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    </Link>
                  ))}
                </>
              }
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}
