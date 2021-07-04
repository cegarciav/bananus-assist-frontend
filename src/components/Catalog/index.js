import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Cookies from 'js-cookie';
import Product from './Product/product';
import { apiGet } from '../../services/api-service';
import FaceRecognition from '../FaceRecognition/video_stream';

function Catalog() {
  const [products, setProducts] = useState(null);
  const salePointId = Cookies.get('salePointId');

  useEffect(() => {
    if (!products) {
      apiGet('products')
        .then((result) => {
          setProducts(result);
        });
    }
  }, [products]);

  return (
    <div>
      {<FaceRecognition location={salePointId}/>}
      <Box p={7}>
        <Grid container justify="center" spacing={3}>
          {
            !products ? <></>
              : <>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.sku} >
                  <Product {...product}/>
            </Grid>
          ))}
            </>
          }
        </Grid>
      </Box>
    </div>
  );
}

export default Catalog;
