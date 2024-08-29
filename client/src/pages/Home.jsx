import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORY } from '../utils/queries';
import ProductItem from '../components/ProductItem';
import { loadProductsByCategory } from '../utils/slices/productSlice';
import { setCurrentCategory } from "../utils/slices/currentCategorySlice";
import { Grid, Typography, Container } from '@mui/material';

const ProductGridSection = ({ title, products }) => (
  <div>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={6} key={product._id} component='article'>
          <ProductItem product={product}/>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default function Home() {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);
  const [homeCategoryId, setHomeCategoryId] = useState(null);

  useEffect(() => {
    if(categories.length > 0) {
      const homeCategory = categories.find(category => category.name.toLowerCase() === 'home');
      if(homeCategory){
        setHomeCategoryId(homeCategory._id);
        dispatch(setCurrentCategory(homeCategory._id));
      }
    }
  },[categories, dispatch]);

  const { data: categoryData, loading, error } = useQuery(QUERY_CATEGORY,{
    skip: !homeCategoryId,
    variables: { id: homeCategoryId}
  });

  useEffect(() => {
    if(categoryData && categoryData.category && categoryData.category.products){
      dispatch(loadProductsByCategory(categoryData.category.products));
    }
  },[categoryData, dispatch]);

  const bestSellers = products.slice(0,4);
  const newArrivals = products.slice(4,8);
  const remainingProducts = products.slice(8);

  return(
    <main>
      <Typography variant='h4' gutterBottom>
        Home
      </Typography>

      <Container className="home-container">
        <Grid container spacing={3}>

          <Grid item xs={12} md={6} component="section">
            <ProductGridSection title="Best Sellers" products={bestSellers}/>
          </Grid>
          
          <Grid item xs={12} md={6} component='section'>
            <ProductGridSection title="New Arrivals" products={newArrivals}/>
          </Grid>

          <Typography variant="h5" gutterBottom style={{marginTop: '15px', paddingLeft: '20px'}}>
            More Products
          </Typography>
          <Grid container spacing={2} sx={{margin: 0}} component='section'>
            {remainingProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id} component='article'>
                <ProductItem product={product}/>
              </Grid>
            ))}
          </Grid>

        </Grid>
      </Container>
    </main>
  )
}