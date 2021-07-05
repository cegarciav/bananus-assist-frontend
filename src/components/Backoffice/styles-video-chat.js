import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  btn: {
    alignItems: 'center',
    marginLeft: '75vh',
    '@media only screen and (max-width: 1240px)': {
      alignItems: 'center',
      marginLeft: '38vh',
    },
    '@media only screen and (max-width: 600px)': {
      alignItems: 'center',
      marginLeft: '25vh',
    },
  },
  videoContainer: {
    width: '100%',
    height: 'auto',
    marginTop: '20px',
  },
  videoLeft: {
    margin: '1vh',
    marginLeft: '60vh',
    width: '25%',
    '@media only screen and (max-width: 1240px)': {
      marginLeft: '18vh',
      width: '25%',
    },
    '@media only screen and (max-width: 600px)': {
      marginLeft: '7vh',
    },
  },
  videoRight: {
    margin: '1vh',
    marginLeft: '60vh',
    width: '25%',
    '@media only screen and (max-width: 1240px)': {
      marginLeft: '18vh',
      width: '25%',
    },
    '@media only screen and (max-width: 600px)': {
      marginLeft: '7vh',
    },
  },
});

export default useStyles;
