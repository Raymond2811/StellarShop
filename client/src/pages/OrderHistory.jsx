import { useQuery } from '@apollo/client';
import { QUERY_ORDERS } from '../utils/queries';
import { Paper, Grid, Box, Button } from '@mui/material';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const { loading, error, data } = useQuery(QUERY_ORDERS);
  const navigate = useNavigate();
  const orders  = data?.orders;
  
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <PacmanLoader color="#FFD700" size={40}/>
      </Box>
    );
  }

  return(
    <main>
      <Button 
          variant='contained' 
          onClick={handleGoBack} 
          sx={{
            marginBottom:'20px',
            backgroundImage: (theme) => theme.palette.gradients.main 
          }}
        >
          Go Back
        </Button>

      <h1>Order History</h1>
      {orders?.length ? (
        orders.map(order => (
          <Paper 
            key={order._id} 
            elevation={3} 
            sx={{
              width: '100%', 
              maxWidth: '800px', 
              padding: '2%', 
              margin: '2% auto', 
              color: (theme) => theme.palette.text.secondary
            }}
          >
            <h3>Order ID: {order._id}</h3>
            <p>Date: {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
            <div className="order-products">
              <h3>Products:</h3>
              <Grid container spacing={2}>
                {order.products.map(({ product, purchaseQuantity }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                      <div className="order-product">
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
                        <h4>{product.name}</h4>
                        <p>Description: {product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>Quantity: {purchaseQuantity}</p>
                      </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Paper>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </main>
  ); 
}