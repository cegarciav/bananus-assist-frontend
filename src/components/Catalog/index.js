import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Product from '././Product/product';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
}));

function Catalog(props) {
  const [spacing] = React.useState(2);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container justify="center" spacing={3}>
          {[0,1,2,3,4,5,6,7,8].map((value) => (
            <Grid item xs={4} key={value} >
                  <Product  {...props}/>
            </Grid>
          ))}
        </Grid>
  );
}

export default Catalog;
