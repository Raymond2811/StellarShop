import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement: <NoMatch/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/account',
        element: <Account/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/orderHistory',
        element: <OrderHistory/>
      },
      {
        path: '/computers',
        element: <Computers/>
      },
      {
        path: '/videoGames',
        element: <VideoGames/>
      },
      {
        path: '/cellPhones',
        element: <CellPhones/>
      },
      {
        path: '/cameras',
        element: <Cameras/>
      },
      {
        path: '/product/:id',
        element: <Detail/>
      },
      {
        path: '/success',
        element: <Success/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);