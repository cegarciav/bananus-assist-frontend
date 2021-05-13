import React from 'react';
import useStyles from "./styles-modal";

const Assistance = () => {
  
    const classes = useStyles();

    return (
      <div className={classes.paperContainer}>
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
      </div>
    )
  };

  export default React.forwardRef((props, ref) => <Assistance {...props} forwardedRef={ref} />);
  