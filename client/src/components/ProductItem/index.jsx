import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartQuantity } from '../../utils/slices/cartSlice';
import { ADD_TO_CART } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';

export default function ProductItem({ product }){
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  const handleAddToCart = async() => {
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
        },
      });

      if(existingItem){
        dispatch(updateCartQuantity({
          ...existingItem,
          purchaseQuantity: existingItem.purchaseQuantity + 1
        }));
      } else{
        dispatch(addToCart({
          ...product,
          purchaseQuantity: 1,
        }));
      }
    } catch (error) {
     console.error("Error adding to cart:",error.message);
    }
  };

  return (
    <section className='product-item'>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: 2,
        border: '1px solid #ddd',
        borderRadius:'4px',
        boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.2)',
        maxWidth:'300px',
        margin:'auto',
      }}
      >
        <Link 
          to={`/product/${product._id}`} 
          style={{ textDecoration: 'none', color: 'inherit'}}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '2px'
            }}
          />
           <Typography variant='h6' component="h3" align="center" gutterBottom>
            {product.name}
          </Typography>
        </Link>

        <Typography variant='body1' color='textSecondary' align="center" gutterBottom>
            ${product.price.toFixed(2)}
        </Typography>

        {product.quantity > 0 ? (
          <Button variant='contained' color='primary' onClick={handleAddToCart}>
            Add to Cart
          </Button>
        ) : (
          <Typography variant='body2' color='error' align='center'>
            Out of Stock
          </Typography>
        )}
      </Box>
    </section>
  );
}