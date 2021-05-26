import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    minHeight: '100vh',
    paddingTop: '5vh',
    justifyItems: 'center',
    fontSize: '12px',
  },
  tab: {
    paddingTop: '5vh',
    marginLeft: '10%',
  },
  location: {
    marginLeft: '90px',
    marginTop: '10px',
    marginBottom: '0px',
    color: 'black',
    border: 'white',
    fontFamily: 'Arial',
    '&:before': {
      borderColor: 'white',
    },
  },
  option: {
    color: 'black',
    fontFamily: 'Arial',
    margin: '1em',
  },
  request: {
    width: '40%',
    height: '40%',
  },
}));

export default useStyles;
