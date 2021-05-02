import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      maxWidth:'70%',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '40px',
    },
  
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    product: {
      marginLeft: '00px'
    }
  }));
  
  export default useStyles;