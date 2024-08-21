import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN, ADD_TO_CART, CLEAR_CART } from '../../utils/mutations';
import { QUERY_CART } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [clearCartMutatiion] = useMutation(CLEAR_CART);
  const [cartData] = useLazyQuery(QUERY_CART);
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value,});
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try {
    const { data } = await login({
      variables: { ...formData },
    });

    const { token } = data.login;

    Auth.login(token);

    const { data: fetchCartData } = await cartData();

    if(fetchCartData && fetchCartData.cart && fetchCartData.cart.length > 0){
      await clearCartMutatiion();
    }
    
    await Promise.all(cartItems.map((item) => {
      return addToCartMutation({
        variables:{
          productId: item._id,
          purchaseQuantity: item.purchaseQuantity,
        },
      })
    }));
    
    navigate('/profile');

    setFormData({
      email: '',
      password: '',
    });

    } catch (error) {
     console.error('Error logging in:', error.message);
    }
  }

  return(
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        name='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='me@email.com'
        /> 
        <input
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        placeholder='password'
        required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};