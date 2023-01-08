import React, { useState, useEffect } from 'react';

// package
import { toast } from 'react-toastify';

// Material-ui components
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog
} from '@mui/material';

// components
import { NavBar } from './NavBar';
import { UserList } from './UsersList';
import {
  AddUser,
  UpdateUser,
  DeleteUser,
  GetUser
} from '../Services/Service';

const AddUsers = () => {
  // States
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmPopupMessage, setDeleteConfirmPopupMessage] = useState(false);
  const [usersDataList, setUsersDataList] = useState([]);
  // npx json-server --watch db.json



  const handleOpenModal = () => {
    setOpenModal(true);
  };



  const handleCloseModal = () => {
    setOpenModal(false);
    setDeleteConfirmPopupMessage(false);
    setName('');
    setEmail('');
    setUserName('');
  };


  const handleOpenDeleteConfirmPopupMessage = () => {
    setDeleteConfirmPopupMessage(true);
  }


  const getUsersData = async () => {
    try {
      const { data } = await GetUser();
      setUsersDataList(data);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);



  const handleSubmitAddUser = async () => {
    try {
      const user = { id: '', name, email, username, created: new Date().toLocaleDateString() };
      const { data } = await AddUser(user)
      setName('');
      setEmail('');
      setUserName('');
      setOpenModal(false);
      setUsersDataList([...usersDataList, data]);
      toast.success('User Add successfully', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };


  
  const handleEditUserData = (user) => {
    setName(user.name);
    setEmail(user.email);
    setUserName(user.username);
    setId(user.id);
    setOpenModal(true)
  }


  const handleUpdateUserData = async () => {
    try {
      const user = { id: id, name: name, email: email, username: username, created: new Date().toLocaleDateString() }
      const { data } = await UpdateUser(id, user)
      setName('');
      setEmail('');
      setUserName('');
      setOpenModal(false);
      setUsersDataList([...data]);
      toast.success("User Update successfully", {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };


  
  const handleDeleteUser = async (id, index) => {
    try {
      const { data } = await DeleteUser(id)
      usersDataList.splice(index, 1);
      setUsersDataList(usersDataList, data);
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

  return (
    <div>
      <NavBar
        handleOpenModal={handleOpenModal}
      />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
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
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              id="email"
              name="email"
              label="Email*"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              id="username"
              name="username"
              label="UserName*"
              // error={validate.validate && validate.validate.username ? 'is-invalid ' : ''}
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={handleSubmitAddUser}
            >
              Add User
            </Button>
            <Button
              color="primary"
              type="submit"
              onClick={handleUpdateUserData}
            >
              Update User
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      

      <UserList
        usersDataList={usersDataList}
        handleEditUserData={handleEditUserData}
        handleDeleteUser={handleDeleteUser}
        handleOpenDeleteConfirmPopupMessage={handleOpenDeleteConfirmPopupMessage}
        deleteConfirmPopupMessage={deleteConfirmPopupMessage}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
export { AddUsers };
