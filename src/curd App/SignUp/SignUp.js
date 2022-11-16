import React, { useState } from 'react';

// package
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Base64 } from 'js-base64';

//material-ui components 
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';

//components
import { SignupUser } from '../Service/Service';
import Form from '../component/FromValidtion';

//styles theme
const theme = createTheme();

const SignUp = () => {
  // states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [npassword, setPassword] = useState('');
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const password = Base64.encode(npassword);

  /**
   * User Signup
   */
  const handleSignUp = async (event) => {
    event.preventDefault();
    const validate = validateforgotPassword();
    if (validate) {
      try {
        const inputValues = { fullName, email, password };
        const { data } = await SignupUser(inputValues)
        console.log(data);
        setValidate({});
        setFullName('');
        setEmail('');
        setPassword('');
        navigate("/");
        toast.success('User is Successfully Sign Up', {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error('Signup failed', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  };

  /**
   * Cancel signup  inputValues form and empty input field
   */
  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    navigate("/");
  }

  /**
   *  validation user From
   * @returns error
   */
  const validateforgotPassword = () => {
    let isValid = true;
    let validator = Form.validator({
      fullName: {
        value: fullName,
        isRequired: true,
      },
      email: {
        value: email,
        isRequired: true,
        isPassword: true
      },
      password: {
        value: npassword,
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
  }

  if (!user) {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
              marginTop: 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                SIGN UP
              </Typography>
              <form onSubmit={handleSignUp}>
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        autoComplete="given-name"
                        name="fullName"
                        id="fullName"
                        label="FullName"
                        autoFocus
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        error={validate.validate && validate.validate.fullName ? 'is-invalid ' : ''}
                      />
                      <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.fullName) ? 'd-block' : 'd-none'}`} >
                        {(validate.validate && validate.validate.fullName) ? validate.validate.fullName[0] : ''}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
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
                        value={npassword}
                        onChange={(event) => setPassword(event.target.value)}
                        error={validate.validate && validate.validate.password ? 'is-invalid ' : ''}
                      />
                      <button type="button" className="btn btn-outline-primary btn-sm" onClick={(event) => togglePassword(event)} ><i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} ></i> </button>
                      <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                        {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                      </div>
                    </Grid>
                  </Grid>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 2, mb: 1, width: 170 }}
                    >
                      SIGN UP
                    </Button>
                    <Button
                      type="submit"
                      color="secondary"
                      sx={{ mt: 2, mb: 1, width: 170 }}
                      variant="contained"
                      onClick={handleCancel}
                    >
                      CANCEL
                    </Button>
                  </Box>
                  <Grid container justifyContent="flex-end">
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
        />
      </div>
    );
  } return (
    navigate("/")
  )
}
export { SignUp };