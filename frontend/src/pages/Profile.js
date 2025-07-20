import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
          User Profile
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Profile management coming soon...
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
