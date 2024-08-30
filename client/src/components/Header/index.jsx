import Nav from '../Nav';
import Cart from '../Cart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header(){
  const { isAuthenticated } = useSelector((state) => state.user)

  return(
    <header>
      <Box
        className='header-container'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          backgroundColor: 'cyan'
        }}
      > 
        <Box 
          className='header-elements'
          sx={{
            display: 'flex', 
            alignItems:'center', 
            gap: 2
          }}
        >
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
            <Typography variant='h4' component="h1">
              Stellar Shop
            </Typography>
          </Link>
          <Nav/>
        </Box>

        <Box 
          className='header-elements'
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2
          }}
        >
          <Link to={isAuthenticated ? '/profile' : '/account'}>
            <IconButton color='inherit'>
              <AccountCircleIcon fontSize='large'/>
            </IconButton>
          </Link>
          <Cart/>
        </Box>
      </Box>
    </header>
  )
}