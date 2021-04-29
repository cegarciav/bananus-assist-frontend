import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: 'white',
    height: 'auto',
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
        Pagina inicial1
    </div>
  )
};

export default Home;