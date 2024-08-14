import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartQuantity } from '../../utils/slices/cartSlice';
import { ADD_TO_CART } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

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
    <div className='product-item'>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name}/>
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}