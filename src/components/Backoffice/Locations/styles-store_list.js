import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  item: {
    minHeight: '100vh',
  },
  button: {
    color: '#195E6D',
    fontSize: '18px',
    borderRadius: '10px',
    borderColor: '#195E6D',
    backgroundColor: 'white',
    minWidth: '150px',
    minHeight: '35px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: '#195E6D',
      color: 'white',
    },
  },
  option: {
    color: 'black',
    fontFamily: 'Arial',
    margin: '1em',
  },
}));

export default useStyles;
