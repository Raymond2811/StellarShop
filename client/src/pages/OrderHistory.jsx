import { useQuery } from '@apollo/client';
import { QUERY_ORDERS } from '../utils/queries';

export default function OrderHistory() {
  const { loading, error, data } = useQuery(QUERY_ORDERS);
  
  const orders  = data?.orders;

  return(
    <div>
      <h1>Order History</h1>
      {orders?.length ? (
        orders.map(order => (
          <div key={order._id} className="order">
            <h2>Order ID: {order._id}</h2>
            <p>Date: {new Date(order.purchaseDate).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
            <div className="order-products">
              <h3>Products:</h3>
              {order.products.map(({ product, purchaseQuantity }) => (
                <div key={product._id} className="order-product">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>Description: {product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Quantity: {purchaseQuantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  ); 
}