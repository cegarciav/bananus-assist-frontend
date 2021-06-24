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
  item: {
    minHeight: '50vh',
    spacing: 0,
    direction: 'column',
    alignItems: 'center',
    justify: 'center',
  },
}));

export default useStyles;
