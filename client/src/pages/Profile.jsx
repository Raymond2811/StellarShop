import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER, DELETE_USER, CLEAR_CART } from '../utils/mutations';
import Auth from '../utils/auth';
import { login, logout } from '../utils/slices/userSlice';
import { clearCart } from '../utils/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField  from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(QUERY_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [clearCartMutation] = useMutation(CLEAR_CART);

  const [updateFormData, setUpdateFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [deleteFormData, setDeleteFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if(data?.user){
      dispatch(login());
    }
  },[data, dispatch])

  const handleUpdateChange = (e) => {
    const {name, value} = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value});
  };

  const handleDeleteChange = (e) => {
    const {name, value} = e.target;
    setDeleteFormData({ ...deleteFormData, [name]: value});
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const filteredFormData = Object.fromEntries(
      Object.entries(updateFormData).filter(([ _, value ]) => value)
    );
  
    try {
      await updateUser({
        variables: { ...filteredFormData }
      })

      setUpdateFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    } catch (error) {
     console.error('Error updating user:', error.message);
    }
  }

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      await deleteUser({
        variables:{ 
          email: deleteFormData.email,
          password: deleteFormData.password,
         },
      });

      dispatch(clearCart());
      dispatch(logout());
      Auth.logout();

    } catch (error) {
     console.error('Error deleting user:', error.message);
    }
  }

  const handleLogout =  async () => {
    try {
      await clearCartMutation();
      dispatch(clearCart());
      dispatch(logout());
      Auth.logout();
    } catch(error){
      console.log('Error logging out:', error.message);
    }
  };

  const handleViwOrderHistory = () => {
    navigate('/orderhistory');
  };

  return(
    <div className='profile-container'>
      <h1>Profile</h1>
      <h2>Hello {data?.user?.firstName} {data?.user?.lastName}</h2>
      <Button variant='contained' onClick={handleViwOrderHistory}>View Order History</Button>
      <p>{data?.user?.email}</p>
      <form onSubmit={handleUpdateUser}>
        <Paper 
          elevation={3} 
          style={{ 
            padding: '20px', 
            marginTop: '20px', 
            width: '60%',
            margin: '0 auto'
          }}
        >
          <Grid justifyContent='center' alignItems='center' container direction='column' spacing={2}>
            <h2>Update Account</h2>
            <Grid item>
              <TextField
              type='text'
              name='firstName'
              value={updateFormData.firstName}
              onChange={handleUpdateChange}
              placeholder='First Name'
              variant='standard'
              label='First Name'
              />
            </Grid>
            <Grid item>
              <TextField
              type='text'
              name='lastName'
              value={updateFormData.lastName}
              onChange={handleUpdateChange}
              placeholder='Last Name'
              variant='standard'
              label='Last Name'
              />
            </Grid>
            <Grid item>
              <TextField
              type='text'
              name='email'
              value={updateFormData.email}
              onChange={handleUpdateChange}
              placeholder='Email'
              variant='standard'
              label='Email'
              />
            </Grid>
            <Grid item>
              <TextField
              type='password'
              name='password'
              value={updateFormData.password}
              onChange={handleUpdateChange}
              placeholder='Password'
              variant='standard'
              label='Password'
              />
            </Grid>
            <Grid item>
              <Button variant='contained' type='submit'>Update Account</Button>
            </Grid>
            <h2>Delete Account</h2>
            <Grid item>
              <TextField
              type='text'
              name='email'
              value={deleteFormData.email}
              onChange={handleDeleteChange}
              placeholder='Email'
              variant='standard'
              label='Email'
              />
            </Grid>
            <Grid item>
              <TextField
              type='password'
              name='password'
              value={deleteFormData.password}
              onChange={handleDeleteChange}
              placeholder='Password'
              variant='standard'
              label='Password'
              />
            </Grid>
            <Grid item>
              <Button onSubmit={handleDeleteUser}variant='contained' type='submit'>Delete Account</Button>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={handleLogout}>
                Logout
              </Button> 
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  )
}