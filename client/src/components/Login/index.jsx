import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN, ADD_TO_CART, CLEAR_CART } from '../../utils/mutations';
import { QUERY_CART } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Login(){
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const [clearCartMutation] = useMutation(CLEAR_CART);
  const [cartData] = useLazyQuery(QUERY_CART);
  const [formData, setFormData] = useState({
    email:'',
    password: '',
  });

  const [errorState, setErrorState] = useState({
    emailError: false,
    passwordError: false,
    emailErrorMessage: '',
    passwordErrorMessage: ''
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
      await clearCartMutation();
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

      if (error.message.includes('email')) {
        setErrorState({
          ...errorState,
          emailError: true,
          emailErrorMessage: 'Invalid email address',
        });
      } else if (error.message.includes('password')) {
        setErrorState({
          ...errorState,
          passwordError: true,
          passwordErrorMessage: 'Incorrect password',
        });
      } else {
        setErrorState({
          ...errorState,
          emailError: true,
          passwordError: true,
          emailErrorMessage: 'Invalid email or password',
          passwordErrorMessage: 'Invalid email or password',
        });
      }
    }
  };

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='me@email.com'
            variant='standard'
            label='Email'
              error={errorState.emailError}
              helperText={errorState.emailError ? errorState.emailErrorMessage : ''}
            />
          </Grid>
          <Grid item>
            <TextField
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='password'
            required
            variant='standard'
            label='Password'
              error={errorState.passwordError}
              helperText={errorState.passwordError ? errorState.passwordErrorMessage : ''}
            />
          </Grid>
          <Grid item>
            <Button variant='contained' type='submit' >Login</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};