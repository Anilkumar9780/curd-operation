import React from 'react';

// components
import { AddUsers } from './components/AddUser';

// material-ui components
import { Paper } from '@mui/material';

// styles
import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer } from 'react-toastify';

export const MyApp = () => {
  return (
    <>
      <Paper style={{ height: '100vh' }}>
        <div className='App'>
          <AddUsers />
        </div>
      </Paper>
      {/* alert message package component */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
