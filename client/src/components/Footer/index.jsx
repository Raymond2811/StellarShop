import {
  Grid,
  Typography,
  Link,
  Button,
  TextField,
  IconButton,
  Box
} from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          backgroundImage: (theme) => theme.palette.gradients.main,
          marginTop:'20px',
          padding: '20px',
          width: '100%',
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          
          {/* newsletter */}
          <Grid item xs={12} sm={4} textAlign="center" style={{ padding: 10 }}>
            <Typography variant="body1" gutterBottom>
              Sign up for exclusive offers!
            </Typography>
            <form 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}
            >
              <TextField
                label="Enter Email Address"
                variant="outlined"
                size="small"
                type="email"
                name="email"
                style={{ margin: '5px 0' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff', 
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff', 
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                  },
                }}
              />
              <Button 
                variant="contained" 
                color="inherit" 
                type="submit" 
                disabled
              >
                Subscribe
              </Button>
            </form>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={4} style={{ padding: 10 }}>
            <Typography variant="body1" gutterBottom textAlign="center">
              <Link color="inherit" style={{ margin: '0 10px' }}>
                About Us
              </Link>
              <Link color="inherit" style={{ margin: '0 10px' }}>
                Contact
              </Link>
              <Link color="inherit" style={{ margin: '0 10px' }}>
                Privacy Policy
              </Link>
              <Link color="inherit" style={{ margin: '0 10px' }}>
                Terms of Service
              </Link>
            </Typography>
          </Grid>

          {/* Socials */}
          <Grid item xs={12} sm={4} textAlign="center" style={{ padding: 10 }}>
            <Typography variant="body1" gutterBottom>
              <IconButton 
                color="inherit" 
                href="https://facebook.com" 
                target="_blank" 
              >
                <Facebook fontSize="large" />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="https://twitter.com" 
                target="_blank" 
              >
                <XIcon fontSize="large" />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="https://instagram.com" 
                target="_blank" 
              >
                <Instagram fontSize="large" />
              </IconButton>
            </Typography>
          </Grid>
          
          {/* Rights */}
          <Grid item xs={12} sm={4} style={{padding: '0 0 10px 0'}}>
            <Typography variant="body1" color="inherit" textAlign="center">
              &copy; 2024 StellarShop. All Rights Reserved.
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </footer>
  );
}
