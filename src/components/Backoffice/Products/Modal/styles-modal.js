import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  paper: {
    minWidth: 300,
    maxWidth: 600,
    backgroundColor: 'white',
    borderRadius: '10px',
    fontFamily: 'Arial',
    padding: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
    margin: '100px',
  },
  close: {
    color: 'white',
    backgroundColor: '#195E6D',
    borderRadius: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '18px',
    marginRight: '10px',
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
});

export default useStyles;
