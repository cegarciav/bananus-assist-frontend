import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    paper: {
        width: 400,
        backgroundColor: 'white',
        borderRadius: '10px',
        fontFamily: 'Arial',
        padding: '10px',
      },
      paperContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px'
      }
});

export default useStyles;