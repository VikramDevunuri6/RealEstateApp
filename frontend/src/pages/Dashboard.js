import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Home as HomeIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingIcon,
  Notifications as NotificationIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    myProperties: 3,
    totalViews: 127,
    savedProperties: 8,
    activeListings: 2
  });

  const [recentProperties, setRecentProperties] = useState([
    {
      id: 1,
      title: "Modern 2BR Apartment",
      location: "Downtown, NYC",
      price: "$450,000",
      status: "active",
      views: 45,
      image: "🏢"
    },
    {
      id: 2,
      title: "Family House with Garden",
      location: "Brooklyn, NY",
      price: "$650,000",
      status: "pending",
      views: 32,
      image: "🏠"
    },
    {
      id: 3,
      title: "Commercial Space",
      location: "Manhattan, NY",
      price: "$1,200,000",
      status: "active",
      views: 67,
      image: "🏢"
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: "Property viewed", property: "Modern 2BR Apartment", time: "2 hours ago", icon: ViewIcon },
    { id: 2, action: "New inquiry received", property: "Family House with Garden", time: "5 hours ago", icon: NotificationIcon },
    { id: 3, action: "Property updated", property: "Commercial Space", time: "1 day ago", icon: EditIcon },
    { id: 4, action: "Property listed", property: "Downtown Condo", time: "2 days ago", icon: AddIcon }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'sold': return 'info';
      default: return 'default';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <PersonIcon sx={{ fontSize: 30 }} />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome back, {user?.fullName || 'User'}!
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage your real estate portfolio and discover new opportunities
              </Typography>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#e3f2fd' }}>
              <HomeIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
                {stats.myProperties}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                My Properties
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e8' }}>
              <ViewIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                {stats.totalViews}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Views
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#fff3e0' }}>
              <FavoriteIcon sx={{ fontSize: 40, color: '#f57c00', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#f57c00' }}>
                {stats.savedProperties}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Saved Properties
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2, bgcolor: '#f3e5f5' }}>
              <TrendingIcon sx={{ fontSize: 40, color: '#7b1fa2', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                {stats.activeListings}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Listings
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ py: 2, bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#e55555' } }}
                onClick={() => navigate('/list-property')}
              >
                List New Property
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{ py: 2, bgcolor: '#4ecdc4', '&:hover': { bgcolor: '#3db8af' } }}
                onClick={() => navigate('/buy-property')}
              >
                Search Properties
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PersonIcon />}
                sx={{ py: 2 }}
                onClick={() => navigate('/profile')}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<SettingsIcon />}
                sx={{ py: 2 }}
              >
                Settings
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      <Grid container spacing={4}>
        {/* My Properties */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  My Properties
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate('/list-property')}
                >
                  View All
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {recentProperties.map((property) => (
                  <Grid item xs={12} sm={6} key={property.id}>
                    <Card sx={{ '&:hover': { boxShadow: 4 }, transition: 'all 0.3s' }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Typography variant="h3" sx={{ mr: 2 }}>
                            {property.image}
                          </Typography>
                          <Box flex={1}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {property.title}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                              <LocationIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {property.location}
                              </Typography>
                            </Box>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                              {property.price}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Chip 
                            label={property.status.toUpperCase()} 
                            color={getStatusColor(property.status)}
                            size="small"
                          />
                          <Box display="flex" alignItems="center">
                            <ViewIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {property.views} views
                            </Typography>
                          </Box>
                        </Box>
                        
                        <LinearProgress 
                          variant="determinate" 
                          value={property.views} 
                          sx={{ mb: 2, height: 6, borderRadius: 3 }}
                        />
                      </CardContent>
                      
                      <CardActions>
                        <IconButton size="small" color="primary">
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Recent Activity & Notifications */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Badge badgeContent={4} color="error">
                  <NotificationIcon color="primary" />
                </Badge>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: 600 }}>
                  Recent Activity
                </Typography>
              </Box>
              
              <List>
                {recentActivity.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <React.Fragment key={activity.id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <IconComponent color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {activity.property}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  );
                })}
              </List>
              
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                View All Activity
              </Button>
            </Paper>
            
            {/* Performance Metrics */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Performance This Month
              </Typography>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Property Views</Typography>
                  <Typography variant="body2" color="primary">+23%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={73} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Inquiries</Typography>
                  <Typography variant="body2" color="success.main">+15%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={65} color="success" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Profile Views</Typography>
                  <Typography variant="body2" color="warning.main">+8%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} color="warning" sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              
              <Button fullWidth variant="contained" color="secondary">
                View Detailed Analytics
              </Button>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
