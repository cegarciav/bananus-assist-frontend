import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    cardHeader: {
     textAlign: 'center',
    },
    cardContent: {
        textAlign: 'center',
    },
    gridContainer: {
        justify:'center',
    },
    grid: {
        btn:{
            color: 'primary',
        }
    },
  }));

  export default useStyles;