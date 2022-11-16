/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';

// Packages
import { func, array } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Base64 } from 'js-base64';

// material-ui component
import { AppBar } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { PersonAdd } from '@mui/icons-material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Fade } from '@mui/material';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { AccountCircle } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Dialog } from '@mui/material';
import SearchBar from 'material-ui-search-bar';

//component
import { ChangePassword, GetUsers } from '../Service/Service';
import Form from './FromValidtion';


const NavBar = ({
  // props
  handleOpenModal,
  setUserData,
  userData,
}) => {
  // serach state
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [validate, setValidate] = useState({});
  const [searched, setSearched] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id, setid] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  //password encryption 
  const password = Base64.encode(newPassword);

  /**
   * search userData using filter mathod
   * @param {string} searchedVal
   */
  const handleSearchUserName = (searchedVal) => {
    const filteredUserData = userData.filter((users) => users.name.toLowerCase().includes(searchedVal.toLowerCase()));
    setUserData(filteredUserData);
  };

  /**
   * search input box Empty
   */
  const cancelSearch = () => {
    setSearched('');
    handleSearchUserName(searched);
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  /**
   * @param {object} event 
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   *  close open drop menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * open modal user add form
   */
  const handleOpenModalChangePassword = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };

  /**
   * close modal function add form
   */
  const handleCloseModal = () => {
    setValidate({});
    setOpenModal(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  /**
   * get Login user detail
   */
  const getUserData = async () => {
    try {
      const { data } = await GetUsers();
      setid(data[0].id)
      setEmail(data[0].email);
      setFullName(data[0].fullName)
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  /**
   * change password
   */
  const handleChangePassword = async (event) => {
    const validate = validateChangePassword();
    if (validate) {
      try {
        const user = { id: id, fullName, email, password: password, confirmPassword }
        const { data } = await ChangePassword(id, user);
        console.log(data)
        navigate("/");
        setValidate({});
        setOpenModal(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success("Your Password Changed Successfully", {
          position: toast.POSITION.TOP_RIGHT
        });
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }
  };

  /**
   *  change password validate
   * @returns errors
   */
  const validateChangePassword = () => {
    let isValid = true;
    let validator = Form.validator({
      oldPassword: {
        value: oldPassword,
        isRequired: true,
        minLength: 4
      },
      newPassword: {
        value: newPassword,
        isRequired: true,
        minLength: 4
      },
      confirmPassword: {
        value: confirmPassword,
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            />
            {/* search userData input box */}
            <SearchBar
              value={searched}
              onChange={(searchVal) => handleSearchUserName(searchVal)}
              onCancelSearch={() => cancelSearch()}
            />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* open modal add User Form button */}
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{ mx: 3 }}
              >
                Add
                <PersonAdd sx={{ paddingLeft: 1 }} />
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }} />
            <Box />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/*User Logout button */}
              <Avatar
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                // aria-haspopornhpup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                onClick={handleClick}
                sx={{ bgcolor: deepPurple[500], cursor: 'pointer' }}
              >
                <AccountCircle />
              </Avatar>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleOpenModalChangePassword}>Change Password</MenuItem>
                <MenuItem onClick={logout}>Logout <Logout sx={{ paddingLeft: 1 }} /></MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }} />
          </Toolbar>
        </AppBar>
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
        >
          {/* change password users form */}
          <form onSubmit={(event) => event.preventDefault()}>
            <DialogTitle style={{ width: '700px' }} id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="old password"
                id="old password"
                type="password"
                autoComplete="old-password"
                label="Old Password*"
                fullWidth
                style={{ whiteSpace: 'nowrap' }}
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                error={validate.validate && validate.validate.oldPassword ? 'is-invalid ' : ''}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.oldPassword) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.oldPassword) ? validate.validate.oldPassword[0] : ''}
              </div>
              <br />
              <TextField
                fullWidth
                type="password"
                autoComplete="new-password"
                margin="dense"
                id="newpassword"
                name="newpassword"
                label="New Password*"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                error={validate.validate && validate.validate.newPassword ? 'is-invalid ' : ''}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.newPassword) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.newPassword) ? validate.validate.newPassword[0] : ''}
              </div>
              <br />
              <TextField
                fullWidth
                type="password"
                autoComplete="new-password"
                margin="dense"
                id="confmirPassword"
                name="confmirPassword"
                label="Confirm Password*"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                error={validate.validate && validate.validate.confirmPassword ? 'is-invalid ' : ''}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.confirmPassword) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.confirmPassword) ? validate.validate.confirmPassword[0] : ''}
              </div>
              <br />
            </DialogContent>
            <DialogActions>
              {/* cancel button */}
              <Button
                color="primary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              {/* submit Button */}
              <Button
                color="primary"
                type="submit"
                onClick={handleChangePassword}
              >
                submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
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
    </>
  );
}
export { NavBar };

/**
 * Component props types
 */
NavBar.propTypes = {
  handleOpenModal: func.isRequired,
  setUserData: func.isRequired,
  userData: array,
};


