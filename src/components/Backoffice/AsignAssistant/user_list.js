import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

export default function UserList() {
  const user1 = {
    name: 'Pedro Perez',
    id: 1,
  };
  const user2 = {
    name: 'Pablo Perez',
    id: 2,
  };

  return (
    <div >
      <Grid container spacing={0}>
        <Grid item xs={9} md={11}>
          <div >
            <List>
              <Link
                to={{
                  pathname: '/backoffice/assign_location/1',
                }}
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
                    primary={user1.name}
                  />
                </ListItem >
              </Link>
              <Link
                to={{
                  pathname: '/backoffice/assign_location/2',
                }}
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
                    primary={user2.name}
                  />
                </ListItem >
              </Link>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
