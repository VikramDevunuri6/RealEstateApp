import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const Navbar = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <HomeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Real Estate App
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Login
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/register"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
