import React from 'react';
import useStyles from './styles-video-chat';

export default function Menu(props) {
  const classes = useStyles();

  return (
    <div >
        <button className={classes.btn} onClick={props.stopCall}>
                Volver al panel
        </button>
    </div>
  );
}
