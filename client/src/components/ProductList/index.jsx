import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CATEGORY } from "../../utils/queries";
import { loadProductsByCategory } from "../../utils/slices/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.products);
  const [getProducts, { data, loading, error } ]= useLazyQuery(QUERY_CATEGORY,{
    variables: {id: currentCategory},
  });

  useEffect(() => {
    if(currentCategory) {
      getProducts();
    }
  }, [currentCategory, getProducts]);

  useEffect(() => {
    if(data && data.category && data.category.products){
      dispatch(loadProductsByCategory(data.category.products));
    }
  }, [data, dispatch, loading]);

  if(error) return <p>Error: {error.message}</p>


  return(
    <div>
      {data?.category?.products.map((product)=> (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <img src={product.image} alt={product.name}/>
        </div>
      ))}
    </div>
  )
}