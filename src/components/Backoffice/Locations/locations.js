import React, { useState, useEffect } from 'react';
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
import { apiGet } from '../../../services/api-service';

export default function LocationList() {
  const [stores, setStores] = useState(null);

  useEffect(() => {
    if (!stores) {
      apiGet('stores').then((result) => setStores(
        { result },
      ));
    }
  }, [stores]);

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={11} md={11}>
          <div >
            <List >
            {!stores ? <></>
              : <>
                {stores.result.map((store) => (
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
                        {store.incoming_call ? <CallIcon color="primary" /> : <CallIcon  /> }
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                      {store.face_detected ? <EmojiEmotionsIcon color="primary" /> : <EmojiEmotionsIcon  /> }
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
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
