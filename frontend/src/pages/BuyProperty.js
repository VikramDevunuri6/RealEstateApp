import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slider,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Badge,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Rating,
  Fab,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Bed as BedIcon,
  Bathtub as BathIcon,
  SquareFoot as AreaIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  Map as MapIcon,
  ViewList as ListIcon,
  Sort as SortIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const BuyProperty = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [contactProperty, setContactProperty] = useState(null);
  
  // Search and Filter States
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: [0, 2000000],
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: [0, 5000],
    amenities: [],
    furnished: '',
    parking: false,
    sortBy: 'price-low'
  });

  // Mock property data (in real app, this would come from API)
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern 2BR Downtown Apartment",
      description: "Beautiful modern apartment in the heart of downtown with stunning city views and premium amenities.",
      propertyType: "flat",
      price: { amount: 450000, currency: "USD", priceType: "sale" },
      location: {
        address: { street: "123 Main St", city: "New York", state: "NY", zipCode: "10001" },
        coordinates: { lat: 40.7128, lng: -74.0060 },
        distance: "0.5 miles from city center"
      },
      specifications: {
        area: { value: 1200, unit: "sqft" },
        bedrooms: 2,
        bathrooms: 2,
        floors: 1,
        parking: true,
        furnished: "semi-furnished"
      },
      amenities: ["Swimming Pool", "Gym", "Security", "Elevator", "Parking"],
      images: ["🏢"],
      contactInfo: {
        phone: "+1-555-0123",
        email: "agent@realestate.com",
        agentName: "John Smith",
        agentImage: "👨‍💼"
      },
      rating: 4.5,
      reviews: 23,
      datePosted: "2 days ago",
      featured: true,
      virtualTour: true
    },
    {
      id: 2,
      title: "Family House with Garden",
      description: "Spacious family home with beautiful garden, perfect for families with children. Quiet neighborhood with excellent schools nearby.",
      propertyType: "plot",
      price: { amount: 650000, currency: "USD", priceType: "sale" },
      location: {
        address: { street: "456 Oak Avenue", city: "Brooklyn", state: "NY", zipCode: "11201" },
        coordinates: { lat: 40.6892, lng: -73.9442 },
        distance: "2.1 miles from city center"
      },
      specifications: {
        area: { value: 2500, unit: "sqft" },
        bedrooms: 4,
        bathrooms: 3,
        floors: 2,
        parking: true,
        furnished: "unfurnished"
      },
      amenities: ["Garden", "Security", "Parking", "Air Conditioning"],
      images: ["🏠"],
      contactInfo: {
        phone: "+1-555-0456",
        email: "sarah@realestate.com",
        agentName: "Sarah Johnson",
        agentImage: "👩‍💼"
      },
      rating: 4.8,
      reviews: 15,
      datePosted: "1 week ago",
      featured: false,
      virtualTour: false
    },
    {
      id: 3,
      title: "Premium Commercial Space",
      description: "Prime commercial space in Manhattan's business district. Perfect for offices, retail, or restaurants. High foot traffic area.",
      propertyType: "commercial",
      price: { amount: 1200000, currency: "USD", priceType: "sale" },
      location: {
        address: { street: "789 Business Blvd", city: "Manhattan", state: "NY", zipCode: "10016" },
        coordinates: { lat: 40.7589, lng: -73.9851 },
        distance: "0.2 miles from Times Square"
      },
      specifications: {
        area: { value: 3500, unit: "sqft" },
        bedrooms: 0,
        bathrooms: 2,
        floors: 1,
        parking: false,
        furnished: "unfurnished"
      },
      amenities: ["Security", "Elevator", "Internet", "Air Conditioning"],
      images: ["🏢"],
      contactInfo: {
        phone: "+1-555-0789",
        email: "mike@commercialre.com",
        agentName: "Mike Chen",
        agentImage: "👨‍💼"
      },
      rating: 4.2,
      reviews: 8,
      datePosted: "3 days ago",
      featured: true,
      virtualTour: true
    },
    {
      id: 4,
      title: "Luxury Penthouse Suite",
      description: "Stunning penthouse with panoramic city views, private terrace, and premium finishes throughout. The epitome of luxury living.",
      propertyType: "flat",
      price: { amount: 1850000, currency: "USD", priceType: "sale" },
      location: {
        address: { street: "321 Elite Tower", city: "New York", state: "NY", zipCode: "10022" },
        coordinates: { lat: 40.7614, lng: -73.9776 },
        distance: "0.1 miles from Central Park"
      },
      specifications: {
        area: { value: 4200, unit: "sqft" },
        bedrooms: 3,
        bathrooms: 3,
        floors: 1,
        parking: true,
        furnished: "fully-furnished"
      },
      amenities: ["Swimming Pool", "Gym", "Security", "Elevator", "Terrace", "Concierge"],
      images: ["🏙️"],
      contactInfo: {
        phone: "+1-555-0321",
        email: "luxury@premiumre.com",
        agentName: "Emma Wilson",
        agentImage: "👩‍💼"
      },
      rating: 4.9,
      reviews: 31,
      datePosted: "5 hours ago",
      featured: true,
      virtualTour: true
    }
  ]);

  const [filteredProperties, setFilteredProperties] = useState(properties);

  const propertyTypes = [
    { value: 'plot', label: 'Plot/House', icon: '🏠' },
    { value: 'flat', label: 'Apartment/Flat', icon: '🏢' },
    { value: 'commercial', label: 'Commercial Floor', icon: '🏭' }
  ];

  const availableAmenities = [
    'Swimming Pool', 'Gym', 'Security', 'Elevator', 'Parking', 'Garden',
    'Air Conditioning', 'Balcony', 'Terrace', 'Concierge', 'Internet'
  ];

  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'area-large', label: 'Largest Area' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Filter and search logic
  useEffect(() => {
    let filtered = [...properties];

    // Search by title, description, or location
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.address.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }

    // Filter by price range
    filtered = filtered.filter(property => 
      property.price.amount >= filters.priceRange[0] && 
      property.price.amount <= filters.priceRange[1]
    );

    // Filter by bedrooms
    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.specifications.bedrooms >= parseInt(filters.bedrooms));
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      filtered = filtered.filter(property => property.specifications.bathrooms >= parseInt(filters.bathrooms));
    }

    // Filter by area
    filtered = filtered.filter(property =>
      property.specifications.area.value >= filters.area[0] &&
      property.specifications.area.value <= filters.area[1]
    );

    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.some(amenity => property.amenities.includes(amenity))
      );
    }

    // Filter by furnished status
    if (filters.furnished) {
      filtered = filtered.filter(property => property.specifications.furnished === filters.furnished);
    }

    // Filter by parking
    if (filters.parking) {
      filtered = filtered.filter(property => property.specifications.parking);
    }

    // Sort properties
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price.amount - b.price.amount;
        case 'price-high':
          return b.price.amount - a.price.amount;
        case 'newest':
          return new Date(b.datePosted) - new Date(a.datePosted);
        case 'area-large':
          return b.specifications.area.value - a.specifications.area.value;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  }, [searchQuery, filters, properties]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSaveProperty = (propertyId) => {
    setSavedProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
    
    const action = savedProperties.includes(propertyId) ? 'removed from' : 'added to';
    toast.success(`Property ${action} saved list!`);
  };

  const handleContact = (property) => {
    setContactProperty(property);
    setContactDialogOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      propertyType: '',
      priceRange: [0, 2000000],
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: [0, 5000],
      amenities: [],
      furnished: '',
      parking: false,
      sortBy: 'price-low'
    });
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const PropertyCard = ({ property }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
        transition: 'all 0.3s ease',
        position: 'relative'
      }}>
        {property.featured && (
          <Chip
            label="FEATURED"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              fontWeight: 600
            }}
          />
        )}
        
        <CardMedia
          sx={{ 
            height: 200, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '4rem',
            backgroundColor: '#f5f5f5'
          }}
        >
          {property.images[0]}
        </CardMedia>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {property.title}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => handleSaveProperty(property.id)}
              color={savedProperties.includes(property.id) ? 'error' : 'default'}
            >
              {savedProperties.includes(property.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          
          <Box display="flex" alignItems="center" mb={2}>
            <LocationIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {property.location.address.city}, {property.location.address.state}
            </Typography>
          </Box>
          
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
            {formatPrice(property.price.amount)}
          </Typography>
          
          <Box display="flex" gap={2} mb={2}>
            {property.specifications.bedrooms > 0 && (
              <Box display="flex" alignItems="center">
                <BedIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {property.specifications.bedrooms} bed
                </Typography>
              </Box>
            )}
            <Box display="flex" alignItems="center">
              <BathIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {property.specifications.bathrooms} bath
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <AreaIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {property.specifications.area.value} {property.specifications.area.unit}
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={property.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({property.reviews} reviews)
            </Typography>
          </Box>
          
          <Box display="flex" gap={0.5} mb={2} flexWrap="wrap">
            {property.amenities.slice(0, 3).map(amenity => (
              <Chip key={amenity} label={amenity} size="small" variant="outlined" />
            ))}
            {property.amenities.length > 3 && (
              <Chip label={`+${property.amenities.length - 3} more`} size="small" color="primary" />
            )}
          </Box>
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => handleContact(property)}
            startIcon={<PhoneIcon />}
          >
            Contact Agent
          </Button>
          <IconButton onClick={() => toast.info('Share functionality coming soon!')}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)', color: 'white' }}>
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Buy a Property
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Discover your dream home from our curated selection of premium properties
        </Typography>
      </Paper>

      {/* Search and Filters Bar */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by location, title, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                label="Property Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {propertyTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                label="Sort By"
              >
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setFilterDrawerOpen(true)}
                sx={{ flexGrow: 1 }}
              >
                Advanced Filters
              </Button>
              <Button
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('list')}
              >
                <ListIcon />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('map')}
              >
                <MapIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        {/* Active Filters */}
        {(filters.propertyType || filters.amenities.length > 0 || filters.parking) && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Active Filters:
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {filters.propertyType && (
                <Chip
                  label={propertyTypes.find(t => t.value === filters.propertyType)?.label}
                  onDelete={() => handleFilterChange('propertyType', '')}
                  color="primary"
                  variant="filled"
                />
              )}
              {filters.amenities.map(amenity => (
                <Chip
                  key={amenity}
                  label={amenity}
                  onDelete={() => handleAmenityToggle(amenity)}
                  color="primary"
                  variant="filled"
                />
              ))}
              {filters.parking && (
                <Chip
                  label="Parking Required"
                  onDelete={() => handleFilterChange('parking', false)}
                  color="primary"
                  variant="filled"
                />
              )}
              <Button size="small" onClick={clearFilters}>
                Clear All
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Results Summary */}
      <Box mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {filteredProperties.length} Properties Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing results for your search criteria
        </Typography>
      </Box>

      {/* Property Listings */}
      <AnimatePresence>
        <Grid container spacing={3}>
          {filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>

      {filteredProperties.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No properties found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Try adjusting your search criteria or filters
          </Typography>
          <Button variant="contained" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </Paper>
      )}

      {/* Advanced Filters Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 350, p: 2 } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Advanced Filters
          </Typography>
          <IconButton onClick={() => setFilterDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={(e, value) => handleFilterChange('priceRange', value)}
            valueLabelDisplay="auto"
            min={0}
            max={2000000}
            step={50000}
            valueLabelFormat={formatPrice}
          />
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2" color="text.secondary">
              {formatPrice(filters.priceRange[0])}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatPrice(filters.priceRange[1])}
            </Typography>
          </Box>
        </Box>
        
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Area Range (sqft)
          </Typography>
          <Slider
            value={filters.area}
            onChange={(e, value) => handleFilterChange('area', value)}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            step={100}
          />
        </Box>
        
        <Grid container spacing={2} mb={3}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Min Bedrooms</InputLabel>
              <Select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                label="Min Bedrooms"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="1">1+</MenuItem>
                <MenuItem value="2">2+</MenuItem>
                <MenuItem value="3">3+</MenuItem>
                <MenuItem value="4">4+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Min Bathrooms</InputLabel>
              <Select
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                label="Min Bathrooms"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="1">1+</MenuItem>
                <MenuItem value="2">2+</MenuItem>
                <MenuItem value="3">3+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Box mb={3}>
          <FormControl fullWidth>
            <InputLabel>Furnished Status</InputLabel>
            <Select
              value={filters.furnished}
              onChange={(e) => handleFilterChange('furnished', e.target.value)}
              label="Furnished Status"
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="unfurnished">Unfurnished</MenuItem>
              <MenuItem value="semi-furnished">Semi-Furnished</MenuItem>
              <MenuItem value="fully-furnished">Fully Furnished</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box mb={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.parking}
                onChange={(e) => handleFilterChange('parking', e.target.checked)}
              />
            }
            label="Parking Required"
          />
        </Box>
        
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Amenities
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {availableAmenities.map(amenity => (
              <Chip
                key={amenity}
                label={amenity}
                clickable
                color={filters.amenities.includes(amenity) ? 'primary' : 'default'}
                onClick={() => handleAmenityToggle(amenity)}
                variant={filters.amenities.includes(amenity) ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Box>
        </Box>
        
        <Box display="flex" gap={2}>
          <Button fullWidth variant="outlined" onClick={clearFilters}>
            Clear All
          </Button>
          <Button fullWidth variant="contained" onClick={() => setFilterDrawerOpen(false)}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Contact Agent Dialog */}
      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {contactProperty?.contactInfo.agentImage}
            </Avatar>
            <Box>
              <Typography variant="h6">
                Contact {contactProperty?.contactInfo.agentName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property Agent
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              Property: {contactProperty?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {contactProperty?.location.address.street}, {contactProperty?.location.address.city}
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PhoneIcon />}
                href={`tel:${contactProperty?.contactInfo.phone}`}
                size="large"
              >
                Call {contactProperty?.contactInfo.phone}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmailIcon />}
                href={`mailto:${contactProperty?.contactInfo.email}?subject=Inquiry about ${contactProperty?.title}`}
                size="large"
              >
                Email Agent
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Saved Properties */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => toast.info(`You have ${savedProperties.length} saved properties`)}
      >
        <Badge badgeContent={savedProperties.length} color="error">
          <FavoriteIcon />
        </Badge>
      </Fab>
    </Container>
  );
};

export default BuyProperty;
