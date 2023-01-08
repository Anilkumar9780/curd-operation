import React from 'react';

// Packages
import { func } from 'prop-types';

// material-ui component
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

export const NavBar = ({
  handleOpenModal,
}) => {
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
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

/**
 * Component props types
 */
NavBar.propTypes = {
  handleOpenModal: func.isRequired,
};


