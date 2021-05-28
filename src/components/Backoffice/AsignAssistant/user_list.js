import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import { apiGet } from '../../../services/api-service';

export default function UserList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!users) {
      apiGet('users')
        .then((result) => {
          if (result) setUsers({ result });
        });
    }
  }, [users]);
  return (
      <div >
        <Grid container spacing={0}>
          <Grid item xs={9} md={11}>
            <div >
              <List>
              {!users ? <></>
                : <>
              {users.result.map((user) => (
                    <Link
                    to={{
                      pathname: String('/backoffice/assign_location/') + user.id,
                      state: {
                        user: user.name,
                      },
                    }}
                    key = {user.id}
                    >
                    <ListItem
                    button
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <AccountCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                         primary={user.name}
                      />
                    </ListItem >
                  </Link>
              ))}
              </>
              }
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
  );
}
