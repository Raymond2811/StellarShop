import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productSlice from './utils/slices/productSlice';
import userSlice from './utils/slices/userSlice';
import cartSlice from './utils/slices/cartSlice';

const httpLink = createHttpLink({
  uri:'/graphql',
});

const authLink = setContext((_, { headers })=> {
  const token = localStorage.getItem('id_token');
  return {
    headers:{
      ...headers,
      authorization: token ?`Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    cart: cartSlice,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Nav/>
        <Outlet/>
      </Provider>
    </ApolloProvider>
  );
};

export default App;