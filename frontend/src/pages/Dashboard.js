import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Manage your properties and explore new listings
          </Typography>
          <Box>
            <Typography variant="body1">
              🏠 Dashboard features coming soon...
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
