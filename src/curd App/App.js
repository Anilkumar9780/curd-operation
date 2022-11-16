import React, { useState } from 'react';

// react-router-dom package
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import { AddUsers } from './component/AddUser';
import { Login } from './Login/Login';
import { SignUp } from './SignUp/SignUp';

// material-ui components
import { ThemeProvider, createTheme, IconButton, Paper } from '@mui/material';
import { Brightness7 } from '@mui/icons-material';
import { Brightness4 } from '@mui/icons-material';

// styles
import 'react-toastify/dist/ReactToastify.css';

export const MyApp = () => {
  // state
  const [darkMode, setDarkMode] = useState(false);

  // create theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  /**
   *  onclick darkMode and lightMode
   */
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: '100vh' }}>
        <div className='App'>
          {/* button onclick change theme lightMode and DarkMode  */}
          <IconButton id="dark-mode" onClick={handleThemeChange}>
            {theme.palette.mode === "light" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {/* components using routing */}
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/addUsers" element={<AddUsers />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Paper>
    </ThemeProvider >
  );
}
