import { createBrowserRouter } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Checkout from '../pages/Checkout/Checkout';
import Bookings from '../pages/Bookings/Bookings';
import PrivateRoute from './PrivateRoute';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/checkout/:id',
        element: <PrivateRoute> <Checkout /> </PrivateRoute>,
        loader: ({params}) => fetch(`https://backend-car-doctor.vercel.app/services/${params.id}`)
      },
      {
        path: '/bookings',
        element: <PrivateRoute> <Bookings /> </PrivateRoute>
      }
    ]
  },
]);

export default routes;
