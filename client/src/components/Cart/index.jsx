import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { CLEAR_CART, CHECKOUT } from '../../utils/mutations';
import { clearCart, toggleCart} from '../../utils/slices/cartSlice';
import CartItem from '../CartItem';
import {
  Drawer,
  IconButton,
  Button,
  Typography,
  Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Cart(){
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartOpen = useSelector((state) => state.cart.cartOpen);
  
  const dispatch = useDispatch();
  const [clearCartMutation] = useMutation(CLEAR_CART);
  const [checkout] = useMutation(CHECKOUT);

  const handleClearCart = async () => {
    if(!Auth.loggedIn()){
      dispatch(clearCart());
      return;
    }

    try{
      await clearCartMutation();
      dispatch(clearCart());
    } catch (error) {
      console.error('Error clearing cart:', error.message);
    }
  }

  const handleCheckout = async () => {
    try {
     const { data } = await checkout({
      variables: {
        products: cartItems.map((product) => ({
          _id: product._id,
          name: product.name,
          // image: product.image,
          description: product.description,
          price: product.price,
          purchaseQuantity: product.purchaseQuantity,
          quantity: product.quantity,
        })),
      },
     });
            
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.checkout.session });
    } catch (error) {
     console.error('Checkout Error:', error);
    }
  }

  const handleToggleCart = async () => {
    dispatch(toggleCart());
  }

  return(
  <section>
    <IconButton color="inherit" onClick={handleToggleCart}>
      <ShoppingCartIcon />
    </IconButton>
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={handleToggleCart}
    >
      <Box sx={{ width: 400, padding: 2 }}>
        <Box sx={{
          display: "flex",
          justifyContent: 'end',
          alignItems: 'center',
          gap: 2,
          marginBottom: 2,
        }}
        >
          <Typography variant="h5" component="h2">
            Your Shopping Cart
            <IconButton 
              color="inherit" 
              onClick={handleToggleCart}
              sx={{ marginLeft: 5 }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </Box>

        {cartItems.length ? (
          <Box>
            {cartItems.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
            {Auth.loggedIn() ? (
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleCheckout}
                sx={{ marginTop: 2 }}
              >
                Checkout
              </Button>
            ) : (
              <Button 
                component={Link} 
                to="/account" 
                onClick={handleToggleCart}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Log In to Check Out!
              </Button>
            )}
            <Button 
              variant="outlined" 
              color="secondary" 
              fullWidth 
              onClick={handleClearCart}
              sx={{ marginTop: 2 }}
            >
              Clear Cart
            </Button>
          </Box>
        ) : (
          <Typography 
            variant="body1"
            sx={{display: 'flex', justifyContent: 'center'}}
          >
            Your cart is empty.
          </Typography>
        )}
      </Box>
    </Drawer>
  </section>
  )
}