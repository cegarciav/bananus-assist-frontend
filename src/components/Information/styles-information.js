import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  titleContent: {
    padding: theme.spacing(4,0,0,0),
  },

  infoTitle: {
    color: '#356B77',
    padding: theme.spacing(4,0,0,0),
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '300%',   
    align: 'left',
  },

  infoDescription: {
    color: '#000000',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '140%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    align: 'left',
  },

  infoHow: {
    color: '#000000',
    padding: theme.spacing(3,0,0,3),
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    display: 'flex',
    alignItems: 'center',
  },

  stepTitle: {
    color: '#356B77',
    padding: theme.spacing(4,0,0,0),
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '57px',
    lineHeight: '69px',
    display: 'flex',
    alignItems: 'center',
    width: '63px',
    height: '40px',
    
    top: '685px',
  },
  stepDescription: {
    color: '#000000',
    padding: theme.spacing(3,0,0,3),
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
  },
  stepImage: {
    width: '30%',
    height: 'auto',
  },




  cardHeader: {
    backgroundColor: '#195E6D',
   
      
  },


}));


  export default useStyles;