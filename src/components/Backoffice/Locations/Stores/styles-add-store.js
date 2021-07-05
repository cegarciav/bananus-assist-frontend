import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  paper: {
    width: 400,
    backgroundColor: 'white',
    borderRadius: '10px',
    fontFamily: 'Arial',
    padding: '10px',
  },
  paperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
    justifyItems: 'center',
  },
  input: {
    marginBottom: '20px',
    marginLeft: '30%',
    display: 'block',
  },
  close: {
    float: 'right',
    fontSize: '18px',
    borderRadius: '10px',
    marginBottom: '10px',
    borderColor: 'white',
    backgroundColor: '#195E6D',
    color: 'white',
    '&:hover': {
      borderColor: '#195E6D',
      backgroundColor: 'white',
      color: '#195E6D',
    },
  },
  header: {
    textAlign: 'center',
  },
  add: {
    display: 'block',
    color: 'white',
    fontSize: '18px',
    borderRadius: '10px',
    backgroundColor: '#195E6D',
    marginBottom: '10px',
    width: '200px',
    height: '35px',
    marginLeft: '5em',
    '&:hover': {
      borderColor: '#195E6D',
      backgroundColor: 'white',
      color: '#195E6D',
    },
  },
  errors: {
    color: '#EF1717',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '10px',
  },
});

export default useStyles;
