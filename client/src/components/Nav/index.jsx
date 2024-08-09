import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../../utils/slices/productSlice';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function Nav(){
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products)

  const { data, loading, error } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (data && data.categories){
      dispatch(loadCategories(data.categories));
    }
  }, [data, dispatch, loading])

  if (error) return <p>Error: {error.message}</p>
  return (
    <nav>
      <ul>
        {categories.map((category) =>(
          <li key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};