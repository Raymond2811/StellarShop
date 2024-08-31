import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CATEGORY } from "../../utils/queries";
import { loadProductsByCategory } from "../../utils/slices/productSlice";
import ProductItem from "../ProductItem";
import { Grid, Container, Box } from '@mui/material';
import { PacmanLoader } from 'react-spinners';

export default function ProductList() {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.currentCategory);
  const [getProducts, { data, loading, error } ]= useLazyQuery(QUERY_CATEGORY,{
    variables: {id: currentCategory},
  });

  useEffect(() => {
    if(currentCategory) {
      getProducts();
    }
  }, [currentCategory, getProducts]);

  useEffect(() => {
    if(data && data.category && data.category.products){
      dispatch(loadProductsByCategory(data.category.products));
    }
  }, [data, dispatch, loading]);

  if(error) return <p>Error: {error.message}</p>

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PacmanLoader color="#FFD700" size={40}/>
      </Box>
    );
  }

  return(
    <div className="product-list-container">
      <Container>
        <Grid container spacing={3}>
          {data?.category?.products.map((product) => (
            <Grid item xs={6} md={3} key={product._id}>
              <ProductItem product={product}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}