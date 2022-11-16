import React, { useEffect, useState } from 'react';

// package
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { Base64 } from 'js-base64';

// material-ui components
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';

// components
import { LoginUser } from '../Service/Service';
import From from '../component/FromValidtion';

// styles
const theme = createTheme();

const Login = () => {
  // states
  const [email, setEmail] = useState('');
  const [dpassword, setPassword] = useState('');
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const password = Base64.encode(dpassword);

  /**
   * Login User
   * @param {object} event 
   */
  const handleUserLogin = async (event) => {
    event.preventDefault();
    const validate = validateRegister();
    if (validate) {
      try {
        const { data } = await LoginUser(email, password)
        if (data[0].email === email && data[0].password === password) {
          localStorage.setItem("token", JSON.stringify(data));
          setValidate({});
          setEmail('');
          setPassword('');
          navigate("/addUsers");
          toast.success('User is Successfully Logged in !', {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          setEmail('');
          setPassword('');
          toast.warn('Please Enter Valid Email or Password !', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      } catch (error) {
        toast.error('Login failed!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    };
  };

  /**
   * passing the navigate in useEffect dependency
   */
  useEffect(() => {
    if (user) {
      navigate("/addUsers")
    }
  }, [user, navigate])

  /**
   * login from validation
   * @returns erros
   */
  const validateRegister = () => {
    let isValid = true;
    let validator = From.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true
      },
      password: {
        value: dpassword,
        isRequired: true,
        minLength: 4
      }
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors
      })
      isValid = false
    }
    return isValid;
  }

  /**
   * show password and hide password 
   * @param {object} event 
   */
  const togglePassword = (event) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true)
    }
  };


  if (!user) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                LOGIN
              </Typography>
              {/* (event) => event.preventDefault() */}
              <form onSubmit={handleUserLogin}>
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={validate.validate && validate.validate.email ? 'is-invalid ' : ''}
                      />
                      <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={dpassword}
                        onChange={(event) => setPassword(event.target.value)}
                        error={validate.validate && validate.validate.dpassword ? 'is-invalid ' : ''}
                      />
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={(event) => togglePassword(event)} ><i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} ></i> </button>
                      <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.dpassword) ? 'd-block' : 'd-none'}`} >
                        {(validate.validate && validate.validate.dpassword) ? validate.validate.dpassword[0] : ''}
                      </div>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  // onClick={handleUserLogin}
                  >
                    LOGIN
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/signup" variant="body2">
                        create new account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                </DialogContent>
              </form>
            </Box>
          </Container>
        </ThemeProvider>
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
          theme="colored"
        />
      </div>
    );
  }
}
export { Login };