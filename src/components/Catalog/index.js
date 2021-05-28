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

function Catalog() {
  const [products, setProducts] = useState(null);
  const [techChars, setTechChars] = useState(null);
  const [update, setUpdate] = useState(null);
  const [productsOrdered, setProductsOrdered] = useState(null);

  useEffect(() => {
    if (!products) {
      apiGet('products')
        .then((result) => {
          if (result) setProducts({ result });
        });
    }
    if (!techChars) {
      apiGet('chars')
        .then((result) => {
          if (result) setTechChars({ result });
        });
    }
    setUpdate(true);
  }, [products, techChars]);

  useEffect(() => {
    if (update && techChars && products) {
      setUpdate(false);
      const ordered = techChars.result.map((techChar) => {
        const product = products.result.find((u) => u.id === techChar.productId);
        return {
          ...techChar,
          productName: product.name,
          sku: product.sku,
          image: product.image,
          price: product.price,
        };
      });
      const result = groupBy(ordered, 'productName');
      const array = Object.keys(result).map((k) => result[k]);
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
