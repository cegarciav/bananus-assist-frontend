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
    assistButton: {
        color: "#195E6D",
        fontSize: '20px',
        borderRadius: '10px',
        borderColor: "#195E6D",
        backgroundColor: "white",
        marginLeft: '10%',
    },
    navbar: {
        backgroundColor: "#195E6D",
    }

  }));

  export default useStyles;