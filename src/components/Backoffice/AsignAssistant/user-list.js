import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddUser from './AddUser/add_user';
import { apiGet } from '../../../services/api-service';
import useStyles from './styles-user_list';

export default function UserList() {
  const userRoles = { supervisor: 'Supervisor', assistant: 'Asistente', administrator: 'Administrador' };
  const [users, setUsers] = useState(null);
  const [reload, setReload] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!users) {
      apiGet('users')
        .then((result) => {
          if (result) setUsers({ result });
        });
    }
  }, [users]);

  useEffect(() => {
    if (reload) {
      apiGet('users')
        .then((result) => {
          if (result) setUsers({ result });
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
    <div >
      <Grid container spacing={0}>
        <Grid item xs={9} md={11}>
          <button type="button" onClick={handleOpenModal} className={classes.button} >
            + Agregar usuario
          </button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
          >
            <AddUser close={handleCloseModal}
              hideModal ={() => setOpenModal(false) }
              reload ={() => setReload(true) }
            />
          </Modal>
          <div >
            <List>
              {!users ? <>Loading...</>
                : <>
                {users.result.map((user) => (
                   <>
                          <ListItem
                             button
                          >
                            <ListItemAvatar>
                                <Avatar>
                                <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${user.name} [${userRoles[user.rol]}]`}
                            />
                         </ListItem >
                        </>
                ))}
              </>}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
