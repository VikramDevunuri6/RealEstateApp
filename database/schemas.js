const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// User Schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  profileImage: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Property Schema
const propertySchema = new mongoose.Schema({
  propertyId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  ownerId: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    enum: ['plot', 'flat', 'commercial'],
    required: true
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    priceType: {
      type: String,
      enum: ['sale', 'rent'],
      required: true
    }
  },
  location: {
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      fullAddress: String
    },
    coordinates: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    // Approximate coordinates for privacy (shown to users)
    approximateCoordinates: {
      lat: Number,
      lng: Number,
      radius: {
        type: Number,
        default: 500 // meters
      }
    }
  },
  specifications: {
    area: {
      value: Number,
      unit: {
        type: String,
        enum: ['sqft', 'sqm'],
        default: 'sqft'
      }
    },
    bedrooms: Number,
    bathrooms: Number,
    floors: Number,
    parking: Boolean,
    furnished: {
      type: String,
      enum: ['unfurnished', 'semi-furnished', 'fully-furnished']
    }
  },
  amenities: [String],
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  contactInfo: {
    phone: String,
    email: String,
    preferredContactTime: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold', 'rented'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update approximateCoordinates before saving
propertySchema.pre('save', function(next) {
  if (this.location && this.location.coordinates) {
    // Add some random offset for privacy (within 500m radius)
    const randomOffset = 0.005; // approximately 500m
    this.location.approximateCoordinates = {
      lat: this.location.coordinates.lat + (Math.random() - 0.5) * randomOffset,
      lng: this.location.coordinates.lng + (Math.random() - 0.5) * randomOffset,
      radius: 500
    };
  }
  this.updatedAt = Date.now();
  next();
});

// Admin Settings Schema
const adminSettingsSchema = new mongoose.Schema({
  contactNumbers: [{
    type: String,
    description: String,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  mapSettings: {
    defaultZoom: {
      type: Number,
      default: 12
    },
    privacyRadius: {
      type: Number,
      default: 500
    }
  },
  propertyApprovalRequired: {
    type: Boolean,
    default: true
  },
  featuredPropertyLimit: {
    type: Number,
    default: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Search History Schema (for analytics)
const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User'
  },
  searchQuery: {
    location: String,
    propertyType: String,
    priceRange: {
      min: Number,
      max: Number
    },
    filters: Object
  },
  results: {
    count: Number,
    properties: [String] // Property IDs
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Property View Schema (for analytics)
const propertyViewSchema = new mongoose.Schema({
  propertyId: {
    type: String,
    ref: 'Property',
    required: true
  },
  userId: String,
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Property: mongoose.model('Property', propertySchema),
  AdminSettings: mongoose.model('AdminSettings', adminSettingsSchema),
  SearchHistory: mongoose.model('SearchHistory', searchHistorySchema),
  PropertyView: mongoose.model('PropertyView', propertyViewSchema)
};
