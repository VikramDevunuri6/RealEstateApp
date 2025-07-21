import React, { useState } from 'react';
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
  FormControlLabel,
  Checkbox,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Alert,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CameraAlt as CameraIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ListProperty = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    propertyType: '',
    priceType: '',
    
    // Location
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    
    // Price & Details
    price: {
      amount: '',
      currency: 'USD'
    },
    
    // Specifications
    specifications: {
      area: '',
      areaUnit: 'sqft',
      bedrooms: '',
      bathrooms: '',
      floors: '',
      parking: false,
      furnished: ''
    },
    
    // Amenities
    amenities: [],
    
    // Contact Information
    contactInfo: {
      phone: user?.phoneNumber || '',
      email: user?.email || '',
      preferredContactTime: ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = ['Basic Info', 'Location', 'Price & Details', 'Amenities', 'Contact & Review'];
  
  const propertyTypes = [
    { value: 'plot', label: 'Plot/Land' },
    { value: 'flat', label: 'Apartment/Flat' },
    { value: 'commercial', label: 'Commercial Space' }
  ];
  
  const priceTypes = [
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ];
  
  const furnishedOptions = [
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'semi-furnished', label: 'Semi-Furnished' },
    { value: 'fully-furnished', label: 'Fully Furnished' }
  ];
  
  const availableAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Elevator',
    'Air Conditioning', 'Balcony', 'Terrace', 'Power Backup', 'Water Supply',
    'Internet', 'Club House', 'Playground', 'Shopping Center'
  ];

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setFormData(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Basic Info
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.priceType) newErrors.priceType = 'Price type is required';
        break;
      case 1: // Location
        if (!formData.address.street) newErrors['address.street'] = 'Street address is required';
        if (!formData.address.city) newErrors['address.city'] = 'City is required';
        if (!formData.address.state) newErrors['address.state'] = 'State is required';
        if (!formData.address.zipCode) newErrors['address.zipCode'] = 'ZIP code is required';
        break;
      case 2: // Price & Details
        if (!formData.price.amount) newErrors['price.amount'] = 'Price is required';
        if (!formData.specifications.area) newErrors['specifications.area'] = 'Area is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual API call to submit property
      console.log('Property data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Property listed successfully! It will be reviewed by our team.');
      
      // Reset form
      setActiveStep(0);
      // Navigate to dashboard or show success page
      
    } catch (error) {
      toast.error('Failed to list property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="e.g., Modern 2BR Apartment in Downtown"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Describe your property in detail..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.propertyType}>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  label="Property Type"
                >
                  {propertyTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.priceType}>
                <InputLabel>Listing Type</InputLabel>
                <Select
                  value={formData.priceType}
                  onChange={(e) => handleInputChange('priceType', e.target.value)}
                  label="Listing Type"
                >
                  {priceTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={formData.address.street}
                onChange={(e) => handleInputChange('street', e.target.value, 'address')}
                error={!!errors['address.street']}
                helperText={errors['address.street']}
                placeholder="123 Main Street"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.address.city}
                onChange={(e) => handleInputChange('city', e.target.value, 'address')}
                error={!!errors['address.city']}
                helperText={errors['address.city']}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="State"
                value={formData.address.state}
                onChange={(e) => handleInputChange('state', e.target.value, 'address')}
                error={!!errors['address.state']}
                helperText={errors['address.state']}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="ZIP Code"
                value={formData.address.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value, 'address')}
                error={!!errors['address.zipCode']}
                helperText={errors['address.zipCode']}
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={`Price (${formData.priceType === 'rent' ? 'per month' : 'total'})`}
                value={formData.price.amount}
                onChange={(e) => handleInputChange('amount', e.target.value, 'price')}
                error={!!errors['price.amount']}
                helperText={errors['price.amount']}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />$
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Area"
                value={formData.specifications.area}
                onChange={(e) => handleInputChange('area', e.target.value, 'specifications')}
                error={!!errors['specifications.area']}
                helperText={errors['specifications.area']}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formData.specifications.areaUnit}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bedrooms"
                value={formData.specifications.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value, 'specifications')}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bathrooms"
                value={formData.specifications.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value, 'specifications')}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Floors"
                value={formData.specifications.floors}
                onChange={(e) => handleInputChange('floors', e.target.value, 'specifications')}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Furnished Status</InputLabel>
                <Select
                  value={formData.specifications.furnished}
                  onChange={(e) => handleInputChange('furnished', e.target.value, 'specifications')}
                  label="Furnished Status"
                >
                  {furnishedOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.specifications.parking}
                    onChange={(e) => handleInputChange('parking', e.target.checked, 'specifications')}
                  />
                }
                label="Parking Available"
              />
            </Grid>
          </Grid>
        );
      
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Amenities
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose the amenities available in your property
            </Typography>
            <Box>
              {availableAmenities.map(amenity => (
                <Chip
                  key={amenity}
                  label={amenity}
                  clickable
                  color={formData.amenities.includes(amenity) ? 'primary' : 'default'}
                  onClick={() => handleAmenityToggle(amenity)}
                  sx={{ m: 0.5 }}
                  variant={formData.amenities.includes(amenity) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Box>
        );
      
      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value, 'contactInfo')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value, 'contactInfo')}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preferred Contact Time"
                value={formData.contactInfo.preferredContactTime}
                onChange={(e) => handleInputChange('preferredContactTime', e.target.value, 'contactInfo')}
                placeholder="e.g., 9 AM - 6 PM, Weekdays only"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Review Your Listing
              </Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {formData.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {formData.address.street}, {formData.address.city}, {formData.address.state}
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                    ${formData.price.amount}
                  </Typography>
                  <Typography variant="body2">
                    {formData.specifications.area} {formData.specifications.areaUnit} • 
                    {formData.specifications.bedrooms} bed • 
                    {formData.specifications.bathrooms} bath
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                List Your Property
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Fill in the details below to list your property
              </Typography>
            </Box>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mb: 4 }}>
            {renderStepContent()}
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            
            <Box flex={1} />
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                startIcon={isSubmitting ? null : <CheckIcon />}
                size="large"
                sx={{ minWidth: 120 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ListProperty;
