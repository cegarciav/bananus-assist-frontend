import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Product from './Product/product';
import { apiGet } from '../../services/api-service';

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

function Catalog(props) {
  const [products, setProducts] = useState(null);
  const [techChars, setTechChars] = useState(null);
  const [update, setUpdate] = useState(null);
  const [productsOrdered, setProductsOrdered] = useState(null);

  useEffect(() => {
    if (!products) {
      apiGet('products').then((result) => setProducts(
        { result },
      ));
    }
    if (!techChars) {
      apiGet('chars').then((result) => setTechChars(
        { result },
      ));
    }
    setUpdate(true);
  }, [products, techChars]);

  useEffect(() => {
    if (update && techChars && products) {
      setUpdate(false);
      const ordered = techChars.result.map((techChar) => {
        const product = products.result.find((u) => u.id === techChar.productId);
        // eslint-disable-next-line no-param-reassign
        techChar.productName = product.name;
        // eslint-disable-next-line no-param-reassign
        techChar.sku = product.sku;
        // eslint-disable-next-line no-param-reassign
        techChar.image = product.image;
        // eslint-disable-next-line no-param-reassign
        techChar.price = product.price;
        return techChar;
      });
      const result = groupBy(ordered, 'productName');
      const array = [];
      for (const key in result) {
        array.push(result[key]);
      }
      setProductsOrdered(array);
    }
  }, [update, products, techChars]);

  return (
    <Box p={7}>
      <Grid container justify="center" spacing={3}>
        {
          !productsOrdered ? <></>
            : <>
        {productsOrdered.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.sku} >
                <Product {...product}/>
          </Grid>
        ))}
          </>
        }
      </Grid>
    </Box>
  );
}

export default Catalog;
