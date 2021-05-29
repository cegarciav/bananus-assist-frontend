import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 16,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  assistButton: {
    color: '#195E6D',
    fontSize: '20px',
    borderRadius: '10px',
    borderColor: '#195E6D',
    backgroundColor: 'white',
    marginLeft: '10%',
    '&:hover': {
      borderColor: 'white',
      backgroundColor: '#064654',
      color: 'white',
    },
  },
  navbar: {
    backgroundColor: '#195E6D',
  },
  infoButton: {
    color: '#FFFFFF',
    marginLeft: '20%',
  },
  location: {
    marginLeft: '10px',
    float: 'right',
    color: 'white',
    border: 'white',
    '&:before': {
      borderColor: 'white',
    },
  },
  option: {
    color: 'black',
    fontFamily: 'Arial',
    margin: '1em',
  },
}));

export default useStyles;
