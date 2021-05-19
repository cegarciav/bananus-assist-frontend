import React, {useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { apiGet } from '../../services/api-service';

function Catalog(props) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (!products) {
      apiGet('products').then(result => setProducts({
        result,
      })),
    };
	}, [products]);

  if (!products){
    return (
      <>loading</>
  );
  }else{
    return (
      <Box p={7}>
        {products.result.map(product => <>hola</>)}
        <Grid container justify="center" spacing={3}>
          {[0,1,2,3,4,5,6,7,8, 9, 10,11].map((value) => (
            <Grid item xs={12} sm={6} md={4} key={value} >
                  <Product  {...props}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
}

export default Catalog;
