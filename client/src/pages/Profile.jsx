import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_USER, DELETE_USER, CLEAR_CART } from '../utils/mutations';
import Auth from '../utils/auth';
import { login, logout } from '../utils/slices/userSlice';
import { clearCart } from '../utils/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Modal,
  Box,
  Typography,
} from '@mui/material';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useQuery(QUERY_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [clearCartMutation] = useMutation(CLEAR_CART);

  const [open, setOpen] =useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

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

  const handleViewOrderHistory = () => {
    navigate('/orderhistory');
  };

  return(
    <main className='profile-container'>
      <h1>Profile</h1>
      <Grid 
        container 
        justifyContent='space-between' 
        alignItems='center'
        style={{ padding: '0 10px', marginBottom: '20px' }}
      >
       <Grid item>
        <h2>Hello, {data?.user?.firstName} {data?.user?.lastName}</h2>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            onClick={handleViewOrderHistory}
            sx={{backgroundImage:(theme) => theme.palette.gradients.main}}
          >
            View Order History
          </Button>
        </Grid>
      </Grid>

      {/* Update Form */}
      <Paper 
        elevation={3} 
        style={{ 
          padding: '20px', 
          marginTop: '20px', 
          maxWidth:'400px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <form onSubmit={handleUpdateUser}>
          <Grid 
            container 
            direction='column' 
            spacing={2}
            justifyContent='center'
            alignItems='center'
            sx={{color: (theme) => theme.palette.text.secondary}}
          >
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
              <Button 
                variant='contained' 
                type='submit'
                sx={{backgroundImage: (theme) => theme.palette.gradients.main}}
              >
                Update Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Delete Form */}
      <Paper 
        elevation={3} 
        style={{ 
          padding: '20px', 
          marginTop: '20px',
          maxWidth:'400px',
          width: '100%',
          margin: '20px auto'
        }}
      >
        <form onSubmit={handleOpen}>
          <Grid 
            container 
            direction='column' 
            spacing={2}
            justifyContent='center'
            alignItems='center'
            sx={{color: (theme)=> theme.palette.text.secondary}}
          >
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
              <Button 
                variant='contained' 
                type='submit'
                sx={{backgroundImage: (theme) => theme.palette.gradients.main}}
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Grid item sx={{display:'flex',justifyContent:'center'}}>
        <Button 
          variant='contained' 
          onClick={handleLogout}
          sx={{backgroundImage: (theme) => theme.palette.gradients.main}}
        >
            Logout
        </Button>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position:'absolute',
            top:'50%',
            left:'50%',
            transform:'translate(-50%, -50%)',
            width:300,
            bgcolor:'background.paper',
            borderRadius:'10px',
            boxShadow:24,
            p: 4,
            textAlign:'center',
          }}
        >
          <Typography id="modal-title" variant='h6' component="h2" gutterBottom>
            Are you sure you want to delete your account?
          </Typography>

          <Grid container justifyContent='space-between'>
            <Button
              variant='contained'
              color='success'
              onClick={async () => {
                try {
                  await handleDeleteUser();
                  handleClose();
                } catch (error) {
                  console.error("Error during deletion:", error.message);
                }
              }}
            >
              Yes
            </Button>
            <Button
              variant='contained'
              onClick={handleClose}
              color='error'
            >
              No
            </Button>
          </Grid>
        </Box>
      </Modal>
    </main>
  )
}