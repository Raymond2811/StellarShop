import Nav from '../Nav';
import Cart from '../Cart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Button } from '@mui/material';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';

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
          padding: '20px',
          backgroundImage: (theme) => theme.palette.gradients.main,
        }}
      > 
        <Box 
          className='header-elements'
          sx={{
            display: 'flex', 
            alignItems:'center', 
            gap: 2,
            color: (theme) => theme.palette.text.primary,
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
            gap: 2,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Link to={isAuthenticated ? '/profile' : '/account'}>
            <IconButton sx={{ color: (theme) => theme.palette.text.primary}}>
              <PersonOutlineRounded fontSize='large' sx={{ color: 'inherit' }}/>
            </IconButton>
          </Link>
          <Cart fontSize='large'/>
        </Box>
      </Box>
    </header>
  )
}