import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { CLEAR_CART, CHECKOUT } from '../../utils/mutations';
import { clearCart, toggleCart} from '../../utils/slices/cartSlice';
import CartItem from '../CartItem';

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
    <div className={`cart-container ${cartOpen ? 'open' : ''}`}>
    <h2>Your Shopping Cart</h2>
    {cartItems.length ? (
      <div>
        {cartItems.map((product) => (
          <CartItem key={product._id} product={product} />
        ))}
        {Auth.loggedIn() ? (
          <button onClick={handleCheckout}>Checkout</button>
        ) : (
          <Link to="/account" onClick={handleToggleCart}>
            Log In to Check Out!
          </Link>
        )}
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>
    ) : (
      <p>Your cart is empty.</p>
    )}
     <button onClick={handleToggleCart}>Close Cart</button>
  </div>
  )
}