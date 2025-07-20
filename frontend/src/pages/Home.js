import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LocationOn,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const handleListProperty = () => {
    navigate('/list-property');
  };

  const handleBuyProperty = () => {
    navigate('/buy-property');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                color: 'white',
                mb: 2,
              }}
            >
              Find Your Dream Property
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Discover, list, and buy properties with our comprehensive real estate platform
            </Typography>
          </Box>
        </motion.div>

        {/* Main Action Cards */}
        <Grid container spacing={4} justifyContent="center" mb={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleListProperty}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                  <HomeIcon sx={{ fontSize: '4rem', mb: 2 }} />
                  <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
                    LIST YOUR PROPERTY
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 3 }}>
                    List your property with detailed information and let potential buyers find you
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Paper
                      sx={{ 
                        p: 1.5, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white' 
                      }}
                    >
                      <Typography variant="caption">Easy Form</Typography>
                    </Paper>
                    <Paper
                      sx={{ 
                        p: 1.5, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white' 
                      }}
                    >
                      <Typography variant="caption">Map Integration</Typography>
                    </Paper>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#ee5a24',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    Start Listing
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #4834d4, #686de0)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={handleBuyProperty}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                  <SearchIcon sx={{ fontSize: '4rem', mb: 2 }} />
                  <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
                    BUY A PROPERTY
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 3 }}>
                    Search and discover properties near your preferred location with detailed filters
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                    <Paper
                      sx={{ 
                        p: 1.5, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white' 
                      }}
                    >
                      <Typography variant="caption">Location Search</Typography>
                    </Paper>
                    <Paper
                      sx={{ 
                        p: 1.5, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white' 
                      }}
                    >
                      <Typography variant="caption">Smart Filters</Typography>
                    </Paper>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#4834d4',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    Start Searching
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h3"
              sx={{ color: 'white', fontWeight: 600, mb: 2 }}
            >
              Why Choose Our Platform?
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <LocationOn sx={{ fontSize: '3rem', mb: 2, color: '#feca57' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Privacy Protected Maps
                </Typography>
                <Typography variant="body2">
                  Property locations are shown in approximate circles to protect privacy while helping buyers find nearby properties
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <TrendingUp sx={{ fontSize: '3rem', mb: 2, color: '#26de81' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Smart Analytics
                </Typography>
                <Typography variant="body2">
                  Advanced user analytics for admins to track user behavior, popular locations, and market trends
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <HomeIcon sx={{ fontSize: '3rem', mb: 2, color: '#fc5c65' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Easy Management
                </Typography>
                <Typography variant="body2">
                  Simple property listing process with form validation, image uploads, and instant admin approval system
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
