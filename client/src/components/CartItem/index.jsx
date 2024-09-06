import { useMutation } from "@apollo/client";
import { REMOVE_FROM_CART, ADD_TO_CART } from "../../utils/mutations";
import { removeFromCart, updateCartQuantity } from "../../utils/slices/cartSlice";
import { useDispatch } from "react-redux";
import Auth from "../../utils/auth";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartItem({product}) {
  const dispatch = useDispatch();
  const [removeFromCartMutation] = useMutation(REMOVE_FROM_CART);
  const [addToCartMutation] = useMutation(ADD_TO_CART);

  const handleQuantityChange = async (amount) => {
    const newQuantity = product.purchaseQuantity + amount;

    if(newQuantity > product.quantity){
      return;
    }

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
    <section className="cart-item">
      <Box sx={{
        display: 'flex',
        alignItems:'center',
        borderBottom: '1px solid white',
        marginBottom:'20px'
      }}
      >
        <IconButton 
          sx={{
            padding: 0, 
            color: (theme) => theme.palette.text.primary,
          }} 
          onClick={handleRemoveFromCart}
        >
          <DeleteIcon fontSize="large"/>
        </IconButton>

        <img
          src={product.image}
          alt={product.name}
          style={{  
            maxWidth:'100px',
            height: '100px', 
            objectFit:'contain', 
            padding:'10px',
            borderRadius:'15px'
          }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h7">{product.name}</Typography>
          <Typography variant="body1">Price: ${product.price}</Typography>

          <div 
            className="quantity-controls"
            style={{ 
              display: 'flex', 
              alignItems: 'center',  
            }}
          >
            <Typography variant="body2">Quantity:</Typography>
            
            <IconButton 
              size="small" 
              onClick={() => handleQuantityChange(-1)}
              sx={{ marginLeft: 1, marginRight: 1, }}
              color='inherit'
            >
              <RemoveIcon />
            </IconButton>

            <Typography variant="body2">{product.purchaseQuantity}</Typography>
            
            <IconButton 
              size="small" 
              onClick={() => handleQuantityChange(1)}
              sx={{ marginLeft: 1,}}
              color='inherit'
            >
              <AddIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    </section>
  );
}