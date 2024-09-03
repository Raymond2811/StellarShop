import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    // primary: {
    //   main: '#1E88E5',
    // },
    // secondary:{
    //   main: '#FF5722',
    // },
    // background:{
    //   default:'#FF5722',
    // },
    text:{
      primary:'#fff',
      secondary:'#000',
    },
    error:{
      main:'#F5F5F5',
    },
    gradients: {
      main: 'linear-gradient(to top, #050C9C, #3ABEF9)',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#000',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
  },
});

export default theme;