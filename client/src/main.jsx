import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import Account from './pages/Account';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Computers from './pages/Computers';
import VideoGames from './pages/VideoGames';
import CellPhones from './pages/CellPhones';
import Cameras from './pages/Cameras';
import Detail from './pages/Detail';
import Success from './pages/Success';

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