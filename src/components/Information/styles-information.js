import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      
    },
  },

  titleContent: {
    padding: theme.spacing(40,40,40,34),
    
  },

  infoTitle: {
    color: '#195E6D',
  },

  infoDescription: {
    color: '#878787',
    padding: theme.spacing(0,0,3,0),
  },

  infoHow: {
    color: '000000',
    padding: theme.spacing(0,0,3,0),
  },


  cardHeader: {
    backgroundColor: '#195E6D',
   
      
  },


}));


  export default useStyles;