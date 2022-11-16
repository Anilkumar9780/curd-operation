import React, { useEffect, useRef, useState } from 'react';

// Packages
import { array, func, bool } from "prop-types";

// material-ui component
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit } from '@mui/icons-material';
import { Delete } from "@mui/icons-material";
import { Visibility } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { Dialog } from '@material-ui/core';

const UserList = ({
  // props
  userData,
  handleUpdateUserForm,
  handleDeleteUser,
  handleUserDetailPage,
  handleOpenDeletePopupMessage,
  deleteConfirmPopupMessage,
  handleCloseModal
}) => {
  // state
  const [data, setData] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  /**
   * dragged and droppable 
   * user List 
   */
  const handleSort = () => {
    let item = [...data];
    //remove and save the dragged item content 
    const draggedItemContent = item.splice(dragItem.current, 1)[0]
    //switch the position
    item.splice(dragOverItem.current, 0, draggedItemContent)
    //reset the position ref in the User list 
    dragItem.current = null;
    dragOverItem.current = null;
    //update the actual array
    setData(item)
  };

  /**
   * passing dependency 
   * set the data other state
   */
  useEffect(() => {
    setData(userData)
  }, [userData])

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
            {data?.length !== 0 ? (data?.map((user, index) => {
              return (
                <TableRow
                  key={index}
                  className="list-item"
                  draggable
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <TableCell component="th" scope="user">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.created}</TableCell>
                  <TableCell align="right">

                    {/* visibility(view) button */}
                    <IconButton
                      aria-label='Visibility'
                      onClick={() => handleUserDetailPage(user.id)}
                    >
                      <Visibility />
                    </IconButton>

                    {/* Edit Button */}
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleUpdateUserForm(user)}
                    >
                      <Edit />
                    </IconButton>

                    {/* Delete confirm popup message */}
                    <Dialog
                      open={deleteConfirmPopupMessage}
                      onClose={handleCloseModal}
                    >
                      <DialogTitle style={{ width: '400px', height: '50px', color: 'red' }} >Are you sure?</DialogTitle>
                      <DialogContent sx={{color:'red'}}>
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
                      onClick={handleOpenDeletePopupMessage}
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
export { UserList };

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
