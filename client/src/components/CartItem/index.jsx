import { useMutation } from "@apollo/client";
import { REMOVE_FROM_CART, ADD_TO_CART } from "../../utils/mutations";
import { removeFromCart, updateCartQuantity } from "../../utils/slices/cartSlice";
import { useDispatch } from "react-redux";
import Auth from "../../utils/auth";

export default function CartItem({product}) {
  const dispatch = useDispatch();
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  const handleQuantityChange = async (amount) => {
    const newQuantity = product.purchaseQuantity + amount;

    if(newQuantity > 0) {
      if(!Auth.loggedIn()) {
        dispatch(updateCartQuantity({
          ...product,
          purchaseQuantity: newQuantity,
        }));
      } else {
        try {
          await addToCartMutation({
            variables: {
              productId: product._id,
              purchaseQuantity: amount,
            }
          });
          dispatch(updateCartQuantity({
            ...product,
            purchaseQuantity: newQuantity,
          }));
        } catch (error) {
          console.error('Error updating cart item quantity:', error.message);
        }
      }
    } else if(newQuantity === 0){
      handleRemoveFromCart();
    }
  }

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
  
  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.purchaseQuantity}</p>
      <div className="quantity-controls">
        <button  
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <span>{product.purchaseQuantity}</span>
        <button  
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
      </div>
      <button onClick={handleRemoveFromCart}>Remove</button>
    </div>
  );
}