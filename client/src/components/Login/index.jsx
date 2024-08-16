import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, ADD_TO_CART } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useSelector } from 'react-redux';

export default function Login(){
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [login] = useMutation(LOGIN);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
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
    
    await Promise.all(cartItems.map((item) => {
      return addToCartMutation({
        variables:{
          productId: item._id,
          purchaseQuantity: item.purchaseQuantity,
        },
      })
    }));
        
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