import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../../utils/slices/productSlice';
import { setCurrentCategory } from '../../utils/slices/currentCategorySlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link as RouterLink} from 'react-router-dom';
import { Button, Link, Box, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav(){
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products)
  const { data, error } = useQuery(QUERY_CATEGORIES);
  const [ drawerOpen, setDrawerOpen ] = useState(false);

  useEffect(() => {
    if (data && data.categories){
      dispatch(loadCategories(data.categories));
    }
  }, [data, dispatch]);

  const handleCategoryClick = (id) => {
    dispatch(setCurrentCategory(id));
    setDrawerOpen(false);
  }

  const convertToUrlFriendly = (name) => {
    return name.replace(/\s+/g, '').toLowerCase();
  }

  if (error) return <p>Error: {error.message}</p>
  return (
    <nav>  
      <Box className='nav-container' sx={{marginLeft:2}}>
        {categories.map((category) =>(
          <Link
            key={category._id}
            component={RouterLink}
            to={category.name.toLowerCase() === 'home' ? '/' : `/${convertToUrlFriendly(category.name)}`}
            underline="none"
            color="inherit"
            onClick={() => handleCategoryClick(category._id)}
          >
            <Button color='inherit' sx={{fontSize:'16px'}}>
              {category.name}
            </Button>
          </Link>
        ))}
      </Box>

      <Box className='side-nav'>
        <IconButton color='inherit' onClick={() => setDrawerOpen(true)}>
          <MenuIcon fontSize='large'/>
        </IconButton>
        
        <Drawer
          anchor='left'
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ 
            width: 250, 
            padding: 2, 
            backgroundImage: (theme) => theme.palette.gradients.main, 
            height:'100%',
            }}
          >
            {categories.map((category) => (
              <Link
                key={category._id}
                component={RouterLink}
                to={category.name.toLowerCase() === 'home' ? '/' : `/${convertToUrlFriendly(category.name)}`}
                underline='none'
                color='inherit'
                onClick={() => handleCategoryClick(category._id)}
                sx={{ display: 'block', marginBottom: 2}}
              >
                <Button color='inherit' sx={{fontSize:'20px'}}fullWidth>
                  {category.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Drawer>
      </Box>
    </nav>
  );
};