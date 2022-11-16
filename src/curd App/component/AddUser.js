import React, { useState, useEffect } from 'react';

// package
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

// Material-ui components
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Dialog } from '@mui/material';

// components
import { NavBar } from './NavBar';
import { UserList } from './UserList';
import { AddUser, UpdateUser, UserDetailPage, DeleteUser, GetUser } from '../Service/Service';
import Form from './FromValidtion';

const AddUsers = () => {
  // States
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [openDetailPopupPage, setOpenDetailPopupPage] = useState(false);
  const [deleteConfirmPopupMessage, setDeleteConfirmPopupMessage] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [id, setId] = useState();
  const [validate, setValidate] = useState({});
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  /**
   * open modal user add form
   */
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  /**
   * close modal function add form
   */
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenDetailPopupPage(false);
    setDeleteConfirmPopupMessage(false);
    setName('');
    setEmail('');
    setUserName('');
    setModal(false);
  };

  /**
   * delete confirm Popup Message function 
   */
  const handleOpenDeletePopupMessage = () => {
    setDeleteConfirmPopupMessage(true);
  }

  /**
   * Update user form open modal
   */
  const handleUpdateUserForm = (user) => {
    setName(user.name);
    setEmail(user.email);
    setUserName(user.username);
    setId(user.id);
    setModal(true);
  }

  /**
   *  get user list
   */
  const getUserData = async () => {
    try {
      const { data } = await GetUser();
      setUserData(data);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  /** 
   *  add user 
   */
  const handleUserDataSubmit = async () => {
    const validate = validateAddUserForm();
    if (validate) {
      try {
        const user = { id: '', name, email, username, created: new Date().toLocaleDateString() };
        const { data } = await AddUser(user)
        setValidate({});
        setName('');
        setEmail('');
        setUserName('');
        setOpenModal(false);
        setUserData([...userData, data]);
        toast.success('User Add successfully', {
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
   * passing dependency  in useEffect 
   */
  useEffect(() => {
    getUserData();
  }, []);

  /**
   * delete User Data
   * @param {number} id
   */
  const handleDeleteUser = async (id, index) => {
    try {
      const { data } = await DeleteUser(id)
      userData.splice(index, 1);
      setUserData(userData, data);
      setDeleteConfirmPopupMessage(false);
      toast.success('User Delete successfully', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  /**
   * user detail Page 
   * @param {number} id 
   */
  const handleUserDetailPage = async (id) => {
    try {
      const { data } = await UserDetailPage(id)
      setUserDetail(data);
      setOpenDetailPopupPage(true);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  /**
   * Update user Detail
   * @param {number} id 
   * @param {object} user 
   */
  const handleUpdateUser = async () => {
    const validate = validateAddUserForm();
    if (validate) {
      try {
        const user = { id: id, name: name, email: email, username: username, created: new Date().toLocaleDateString() }
        const { data } = await UpdateUser(id, user)
        setValidate({});
        setName('');
        setEmail('');
        setUserName('');
        setModal(false);
        setUserData([...userData, data]);
        toast.success("User Update successfully", {
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
   *  validation user From
   * @returns error
   */
  const validateAddUserForm = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true,
      },
      email: {
        value: email,
        isRequired: true,
        isPassword: true
      },
      username: {
        value: username,
        isRequired: true,
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

  if (user) {
    return (
      <div>
        {/* passing props NavBar component */}
        <NavBar
          handleOpenModal={handleOpenModal}
          setUserData={setUserData}
          userData={userData}
        />

        {/* open modal Dialog Box */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
        >
          {/* add users from */}
          <form onSubmit={(event) => event.preventDefault()}>
            <DialogTitle style={{ width: '700px' }} id="form-dialog-title">Add User</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name*"
                fullWidth
                style={{ whiteSpace: 'nowrap' }}
                error={validate.validate && validate.validate.name ? 'is-invalid ' : ''}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
              </div>
              <br />
              <TextField
                fullWidth
                margin="dense"
                id="email"
                name="email"
                label="Email*"
                error={validate.validate && validate.validate.email ? 'is-invalid ' : ''}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
              </div>
              <br />
              <TextField
                fullWidth
                margin="dense"
                id="username"
                name="username"
                label="UserName*"
                error={validate.validate && validate.validate.username ? 'is-invalid ' : ''}
                value={username}
                onChange={(event) => setUserName(event.target.value)}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.username) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.username) ? validate.validate.username[0] : ''}
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
                onClick={handleUserDataSubmit}
              >
                Add
              </Button>
              {/* update Button */}
            </DialogActions>
          </form>
        </Dialog>

        {/* user Details Page  */}
        <Dialog
          open={openDetailPopupPage}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
        >
          <DialogTitle style={{ width: '700px' }} id="form-dialog-title">User Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name*"
              fullWidth
              style={{ whiteSpace: 'nowrap' }}
              value={userDetail.name}
            />
            <br />
            <TextField
              margin="dense"
              label="Email*"
              fullWidth
              style={{ whiteSpace: 'nowrap' }}
              value={userDetail.email}
            />
            <br />
            <TextField
              variant="outlined"
              margin="dense"
              label="Username*"
              fullWidth
              style={{ whiteSpace: 'nowrap' }}
              value={userDetail.username}
            />
            <br />
            <TextField
              variant="outlined"
              margin="dense"
              label="Created Date*"
              fullWidth
              style={{ whiteSpace: 'nowrap', border: "none" }}
              value={userDetail.created}
            />
          </DialogContent>
          <DialogActions>
            {/* ok button */}
            <Button
              color="primary"
              onClick={handleCloseModal}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* update user form  */}
        {/* open modal Dialog Box */}
        <Dialog
          open={modal}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
          maxWidth="lg"
        >
          {/* Update users from */}
          <form onSubmit={(event) => event.preventDefault()}>
            <DialogTitle style={{ width: '700px' }} id="form-dialog-title">Update User</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name*"
                fullWidth
                style={{ whiteSpace: 'nowrap' }}
                error={validate.validate && validate.validate.name ? 'is-invalid ' : ''}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.name) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.name) ? validate.validate.name[0] : ''}
              </div>
              <br />
              <TextField
                fullWidth
                margin="dense"
                id="email"
                name="email"
                label="Email*"
                error={validate.validate && validate.validate.email ? 'is-invalid ' : ''}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
              </div>
              <br />
              <TextField
                fullWidth
                margin="dense"
                id="username"
                name="username"
                label="UserName*"
                error={validate.validate && validate.validate.username ? 'is-invalid ' : ''}
                value={username}
                onChange={(event) => setUserName(event.target.value)}
              />
              <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.username) ? 'd-block' : 'd-none'}`} >
                {(validate.validate && validate.validate.username) ? validate.validate.username[0] : ''}
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
                onClick={handleUpdateUser}
              >
                Update
              </Button>
              {/* update Button */}
            </DialogActions>
          </form>
        </Dialog>



        {/* passing props UserList */}
        <UserList
          userData={userData}
          handleUpdateUserForm={handleUpdateUserForm}
          handleDeleteUser={handleDeleteUser}
          handleUserDetailPage={handleUserDetailPage}
          handleOpenDeletePopupMessage={handleOpenDeletePopupMessage}
          deleteConfirmPopupMessage={deleteConfirmPopupMessage}
          handleCloseModal={handleCloseModal}
        />
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
      </div>
    );
  } return (
    navigate("/")
  )
}
export { AddUsers };


// /**
  //  *
  //  * @param {object} event
  //  * @returns
  //  */
  // const OnChnage = (event) => {
  //   const string = event.target;
  //   if (string.value.trim() === '') {
  //     setErrors('whitespace not valid');
  //     return false;
  //   }
  //   setName(string.value);
  //   return true;
  // };