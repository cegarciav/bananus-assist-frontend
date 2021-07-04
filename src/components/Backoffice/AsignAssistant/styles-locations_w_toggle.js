import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardHeader: {
    textAlign: 'center',
  },
  cardContent: {
    textAlign: 'center',
  },
  gridContainer: {
    justify: 'center',
  },
  grid: {
    btn: {
      color: 'primary',
    },
  },
  btn: {
    color: 'primary',
    margin: 10,
  },
  text: {
    fontFamily: 'Arial',
  },
}));

export default useStyles;
