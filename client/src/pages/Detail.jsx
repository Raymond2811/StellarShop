import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {
  removeFromCart,
  addToCart,
  updateCartQuantity,
} from '../utils/slices/cartSlice';
import { ADD_TO_CART, REMOVE_FROM_CART } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCT } from "../utils/queries";
import Auth from '../utils/auth';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(QUERY_PRODUCT,{
    variables: { id },
  });

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);

  const product = data?.product;

  useEffect(() => {
    if(error){
      console.error("Error fetching product:",error)
    }
  },[error]);

  const handleAddToCart = async () => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if(!Auth.loggedIn()){
      if(existingItem){
        dispatch(updateCartQuantity({
          ...existingItem,
          purchaseQuantity: existingItem.purchaseQuantity + 1
        }));
      }else{
        dispatch(addToCart({
          ...product,
          purchaseQuantity: 1,
        }));
      }
      return;
    }

    try {
      await addToCartMutation({
        variables:{
          productId: product._id,
          purchaseQuantity: 1,
        }
      });

      if(existingItem) {
        dispatch(updateCartQuantity({
          ...existingItem,
          purchaseQuantity: existingItem.purchaseQuantity +1
        }));
      } else {
        dispatch(addToCart({
          ...product,
          purchaseQuantity: 1,
        }));
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const handleRemoveFromCart = async () => {
    if(!Auth.loggedIn()){
      dispatch(removeFromCart(product._id));
      return;
    }

    try {
     await removeFromCartMutation({
      variables: { productId: product._id }
     });
     dispatch(removeFromCart(product._id));
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if(!product) return <p>Product not found</p>;

  return(
    <main className="product-detail">
      <Box>
        <Button variant='contained' onClick={handleGoBack} sx={{marginBottom:'20px'}}>
          Go Back
        </Button>

        <Typography variant="h3" gutterBottom>
          {product.name}
        </Typography>
   
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{width: "100%"}}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{display:'flex', flexDirection:'column',justifyContent:'center'}}>
            <Typography variant="h5" align="center" paragraph>
              {product.description}
            </Typography>
            <Typography align="center" variant="h6">
              Price: ${product.price}
            </Typography>
            <Typography variant="h6" align="center" color={product.quantity > 0 ? 'black' : 'error'}>
              {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
            </Typography>

            <Box sx={{marginTop: '20px', display:'flex', justifyContent:'center'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                sx={{ marginRight: '10px'}}
              >
                Add to Cart
              </Button>
              {cartItems.find((item) => item._id === product._id) && (
                <Button variant='contained' color='secondary' onClick={handleRemoveFromCart}>
                  Remove from Cart
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </main>
  )
};