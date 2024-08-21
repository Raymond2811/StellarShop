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

  if(!product) return <p>Product not found</p>;

  return(
    <div className="product-detail">
      <button onClick={handleGoBack}>Go Back</button>
      <h1>Detail</h1>
      <img src={product.image} alt={product.name}/>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>
        {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
      </p>
      <button onClick={handleAddToCart} disabled={product.quantity === 0}>
        Add to Cart
      </button>
      {cartItems.find((item) => item._id === product._id) && (
        <button onClick={handleRemoveFromCart}>
          Remove from Cart
        </button>
      )}
    </div>
  )
};