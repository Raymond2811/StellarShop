import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories, setCurrentCategory } from '../../utils/slices/productSlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

export default function Nav(){
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products)

  const { data, loading, error } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (data && data.categories){
      dispatch(loadCategories(data.categories));
    }
  }, [data, dispatch, loading]);

  const handleCategoryClick = (id) => {
    dispatch(setCurrentCategory(id));
  }

  const convertToUrlFriendly = (name) => {
    return name.replace(/\s+/g, '').toLowerCase();
  }

  if (error) return <p>Error: {error.message}</p>
  return (
    <nav>
      <ul>
        {categories.map((category) =>(
          <li 
            key={category._id} 
          >
            <Link
             to={`/${convertToUrlFriendly(category.name)}`}
             onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};