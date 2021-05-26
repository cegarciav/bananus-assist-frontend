import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
  request_btn: {
    marginLeft: '10px',
    backgroundColor: 'white',
    border: 'solid 1px #195E6D',
    color: '#195E6D',
    borderRadius: '3px',
  },
  alert: {
    marginTop: '10px',
  },
}));

export default useStyles;
