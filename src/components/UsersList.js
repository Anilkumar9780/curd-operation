import React, { useEffect, useState } from 'react';

// Packages
import { array, func, bool } from "prop-types";

// material-ui component
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility
} from '@mui/icons-material';

export const UserList = ({
  // props
  usersDataList,
  handleEditUserData,
  handleDeleteUser,
  handleOpenDeleteConfirmPopupMessage,
  deleteConfirmPopupMessage,
  handleCloseModal,
}) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right"> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* mapping users */}
            {usersDataList?.length !== 0 ? (usersDataList?.map((user, index) => {
              return (
                <TableRow
                  key={index}
                  className="list-item"
                >
                  <TableCell component="th" scope="user">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.created}</TableCell>
                  <TableCell align="right">

                    {/* visibility(view) button */}
                    <IconButton
                      aria-label='Visibility'
                    // onClick={() => handleUserDetailPage(user.id)}
                    >
                      <Visibility />
                    </IconButton>

                    {/* Edit Button */}
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditUserData(user)}
                    >
                      <Edit />
                    </IconButton>

                    {/* Delete confirm popup message */}
                    <Dialog
                      open={deleteConfirmPopupMessage}
                      onClose={handleCloseModal}
                    >
                      <DialogTitle style={{ width: '400px', height: '50px', color: 'red' }} >Are you sure?</DialogTitle>
                      <DialogContent sx={{ color: 'red' }}>
                        This will premanenlty Delete User!
                      </DialogContent>
                      <DialogActions>

                        {/* Delete Button */}
                        <Button
                          aria-label="Delete"
                          onClick={() => handleDeleteUser(user.id, index)}
                        >
                          Delete
                        </Button>

                        {/* close Button */}
                        <Button
                          aria-label="close"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* Delete Confirm Popup Message Button */}
                    <IconButton
                      aria-label="Delete"
                      onClick={handleOpenDeleteConfirmPopupMessage}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
            ) : (
              <tr className="text-center text-danger">
                <td colSpan="5">Not User found</td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

/**
 * Component props Types
 */
UserList.propTypes = {
  userData: array.isRequired,
  handleDeleteUser: func.isRequired,
  handleUserDetailPage: func.isRequired,
  handleOpenDeletePopupMessage: func.isRequired,
  deleteConfirmPopupMessage: bool.isRequired,
  handleUpdateUserForm: func.isRequired,
  handleCloseModal: func.isRequired
};
