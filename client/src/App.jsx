import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import IdleTimer from './components/IdleTimer';
import Header from './components/Header';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { Provider } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';

import productSlice from './utils/slices/productSlice';
import userSlice from './utils/slices/userSlice';
import cartSlice from './utils/slices/cartSlice';
import currentCategorySlice from './utils/slices/currentCategorySlice';
import { PersistGate } from 'redux-persist/integration/react';

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

const persistConfig = {
  key: 'root',
  storage, // This tells Redux Persist to use localStorage (or another storage engine)
  whitelist: ['cart', 'currentCategory', 'user'], // Only persist the cart slice
};

const rootReducer = combineReducers({
  products: productSlice,
  user: userSlice,
  cart: cartSlice,
  currentCategory: currentCategorySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck:{
        ignoreActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IdleTimer/>
          <Header/>
          <Outlet/>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;