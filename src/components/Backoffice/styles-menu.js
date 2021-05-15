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
    minWidth: '400px',
  },
}));

export default useStyles;
