import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const store = {incoming_call: true};

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocalGroceryStoreIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Generic Store Location Name"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      {store.incoming_call ? <CallIcon color="primary" /> : <CallIcon  /> }
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                    {store.face_detected ? <EmojiEmotionsIcon color="primary" /> : <EmojiEmotionsIcon  /> }
                    </IconButton>
                  </ListItemSecondaryAction>
                  
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}