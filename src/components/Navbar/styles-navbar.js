import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    link:{
         textDecoration: 'none', 
         color: 'black',
         fontSize: 16,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

  }));

  export default useStyles;