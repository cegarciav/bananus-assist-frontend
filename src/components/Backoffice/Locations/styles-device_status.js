import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  circleButton: {
    color: '#195E6D',
    fontSize: '18px',
    borderRadius: '10px',
    borderColor: '#195E6D',
    backgroundColor: 'white',
    marginBottom: '10px',
    marginLeft: '10px',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: '#195E6D',
      color: 'white',
    },
  },
  circleButtonDelete: {
    color: '#E24320',
    fontSize: '18px',
    borderRadius: '10px',
    borderColor: '#E24320',
    backgroundColor: 'white',
    marginBottom: '10px',
    marginLeft: '10px',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: '#E24320',
      color: 'white',
    },
  },
  button: {
    color: '#195E6D',
    fontSize: '18px',
    borderRadius: '10px',
    borderColor: '#195E6D',
    backgroundColor: 'white',
    minWidth: '100px',
    minHeight: '35px',
    marginLeft: '10px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: '#195E6D',
      color: 'white',
    },
  },
  deleteButton: {
    color: '#E24320',
    fontSize: '18px',
    borderRadius: '10px',
    borderColor: '#E24320',
    marginLeft: '10px',
    backgroundColor: 'white',
    minWidth: '100px',
    minHeight: '35px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: '#E24320',
      color: 'white',
    },
  },
  input: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  error: {
    color: '#E24320',
    fontSize: '12px',
  },
}));

export default useStyles;
