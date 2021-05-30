import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Product from './Product/product';
import { apiGet } from '../../services/api-service';
import FaceRecognition from "../FaceRecognition/video_stream";
import {useLocation} from "react-router-dom";



function Catalog() {

  let data = useLocation();
  const [products, setProducts] = useState(null);
  const [Location, setLocation] = useState(null);
  useEffect(() => {
    if (!products) {
      apiGet('products').then((result) => setProducts(
        { result },
      ));
    }
  }, [products]);
  useEffect(() => {
    if(data.state){
      setLocation(data.state.location)
    }
  })

  if (!products) {
    return (
      <>
       loading...
      </>
    );
  } else {
    return (
      <Box p={7}>
        <Grid container justify="center" spacing={3}>
          {products.result.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.sku} >
                  <Product  {...product}/>
            </Grid>
          ))}
        </Grid>
        <FaceRecognition location={Location} />
      </Box>
    );
  }
}

export default Catalog;
