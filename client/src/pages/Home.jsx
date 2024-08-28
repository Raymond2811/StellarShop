import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORY } from '../utils/queries';
import ProductItem from '../components/ProductItem';
import { loadProductsByCategory } from '../utils/slices/productSlice';
import { setCurrentCategory } from "../utils/slices/currentCategorySlice";

export default function Home() {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);
  const [homeCategoryId, setHomeCategoryId] = useState(null);

  useEffect(() => {
    if(categories.length > 0) {
      const homeCategory = categories.find(category => category.name.toLowerCase() === 'home');
      if(homeCategory){
        setHomeCategoryId(homeCategory._id);
        dispatch(setCurrentCategory(homeCategory._id));
      }
    }
  },[categories, dispatch]);

  const { data: categoryData, loading, error } = useQuery(QUERY_CATEGORY,{
    skip: !homeCategoryId,
    variables: { id: homeCategoryId}
  });

  useEffect(() => {
    if(categoryData && categoryData.category && categoryData.category.products){
      dispatch(loadProductsByCategory(categoryData.category.products));
    }
  },[categoryData, dispatch]);

  const bestSellers = products.slice(0,4);
  const newArrivals = products.slice(4,8);
  const remainingProducts = products.slice(8);

  return(
    <main>
      <h1>Home</h1>

      <section>
        <h2>Best Sellers</h2>
        <div className="product-grid">
          {bestSellers.map((product)  => (
            <ProductItem key={product._id} product={product}/>
          ))}
        </div>
      </section>

      <section>
        <h2>New Arrivals</h2>  
        <div className="product-grid">
          {newArrivals.map((product) => (
            <ProductItem key={product._id} product={product}/>
          ))}
        </div>      
      </section>

      <section>
        <h2>More Products</h2>
        <div className="product-grid">
          {remainingProducts.map((product) => (
            <ProductItem key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </main>
  )
}