import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADD_ORDER, UPDATE_PRODUCT, CLEAR_CART } from "../utils/mutations";
import { clearCart } from '../utils/slices/cartSlice';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Success() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [addOrder] = useMutation(ADD_ORDER);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [clearCartMutation] = useMutation(CLEAR_CART);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleOrderAndProductUpdate(){
      try {
        await addOrder({
          variables:{
            products: cartItems.map((product)=> ({
              _id: product._id,
              name: product.name,
              image: product.image,
              description: product.description,
              price: product.price,
              purchaseQuantity: product.purchaseQuantity,
              quantity: product.quantity,
            })),
          },
        });
      
        await Promise.all(cartItems.map((product) => 
          updateProduct({
            variables:{
              id: product._id,
              quantity: product.purchaseQuantity,
            },
          })
        ));
        
        await clearCartMutation();
        dispatch(clearCart());

        setTimeout(() => {
          navigate('/');
        }, 3000);

      } catch (error) {
       console.error('Error processing order or updating products:',error);
      }
    }
    handleOrderAndProductUpdate();
  },[addOrder, updateProduct, clearCartMutation]);

  return(
    <main>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        bgcolor='#f0f4f8'
      >
        <CheckCircleOutlineIcon style={{ fontSize: 80, color:'#4caf50'}}/>
        <Typography variant="h2" align="center" gutterBottom>
          Success!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Your order was successful! Redirecting you to the home page...
        </Typography>
      </Box>
    </main>
  )
}