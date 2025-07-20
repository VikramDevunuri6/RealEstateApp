import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const BuyProperty = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
          Buy a Property
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Property search and filters coming soon...
        </Typography>
      </Paper>
    </Container>
  );
};

export default BuyProperty;
