import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  checkbox: {
    marginRight: '3vh',
  },
  delete: {
    color: 'white',
    backgroundColor: '#E65231',
    borderRadius: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '18px',
  },
  header: {
    fontFamily: 'Arial',
  },
});

export default useStyles;
