import { toggleCart } from "../utils/slices/cartSlice";
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../components/Cart';
import '../index.css';


export default function Home() {
  const dispatch = useDispatch();

  const cartOpen = useSelector((state) => state.cart.cartOpen);

  const handleToggleCart = () => {
    dispatch(toggleCart());
}
  return(
    <div>
      <h1>Home</h1>
      <button onClick={handleToggleCart}>
        {cartOpen ? 'Hide Cart' : 'Show Cart'}
      </button>
      {cartOpen && <Cart />}
    </div>
  )
}