import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../../utils/slices/productSlice';
import { setCurrentCategory } from '../../utils/slices/currentCategorySlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link as RouterLink} from 'react-router-dom';
import { Button, Link, Box } from '@mui/material';

export default function Nav(){
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products)

  const { data, error } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (data && data.categories){
      dispatch(loadCategories(data.categories));
    }
  }, [data, dispatch]);

  const handleCategoryClick = (id) => {
    dispatch(setCurrentCategory(id));
  }

  const convertToUrlFriendly = (name) => {
    return name.replace(/\s+/g, '').toLowerCase();
  }

  if (error) return <p>Error: {error.message}</p>
  return (
    <nav>  
      <Box sx={{display: 'flex', gap: 2}}>
      {categories.map((category) =>(
        <Link
          key={category._id}
          component={RouterLink}
          to={`/${convertToUrlFriendly(category.name)}`}
          underline="none"
          color="inherit"
          onClick={() => handleCategoryClick(category._id)}
        >
         <Button color='inherit'>{category.name}</Button>
        </Link>
      ))}
      </Box>
    </nav>
  );
};