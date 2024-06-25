import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { RouterProvider } from "react-router-dom";
import routes from './Routes/Routes';
import AuthProvider from './providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router = {routes} />
      </AuthProvider>
    </React.StrictMode>
  </div>,
)
