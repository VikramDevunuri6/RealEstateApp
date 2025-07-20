# Real Estate Application API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phoneNumber": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "uuid-here",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+1234567890",
      "isVerified": false,
      "role": "user",
      "createdAt": "2023-07-20T12:00:00Z"
    },
    "token": "jwt-token-here"
  }
}
```

#### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "uuid-here",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt-token-here"
  }
}
```

#### GET /auth/me
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "uuid-here",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+1234567890",
      "address": {...},
      "role": "user",
      "isVerified": true
    }
  }
}
```

### Property Endpoints

#### GET /properties
Get all approved properties with optional filters.

**Query Parameters:**
- `location` - Search by location (city, state, etc.)
- `propertyType` - Filter by type (plot, flat, commercial)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```
GET /properties?propertyType=flat&location=New York&minPrice=100000&maxPrice=500000&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "propertyId": "uuid-here",
        "title": "Beautiful 2BR Apartment",
        "description": "Modern apartment in downtown",
        "propertyType": "flat",
        "price": {
          "amount": 250000,
          "currency": "USD",
          "priceType": "sale"
        },
        "location": {
          "address": {...},
          "approximateCoordinates": {
            "lat": 40.7128,
            "lng": -74.0060,
            "radius": 500
          }
        },
        "specifications": {
          "area": { "value": 1200, "unit": "sqft" },
          "bedrooms": 2,
          "bathrooms": 2
        },
        "images": [...],
        "contactInfo": {
          "phone": "+1234567890"
        },
        "views": 45,
        "createdAt": "2023-07-20T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

#### GET /properties/:id
Get property details by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "property": {
      // Full property object with all details
    }
  }
}
```

#### POST /properties
Create a new property listing (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Beautiful 2BR Apartment",
  "description": "Modern apartment with great amenities",
  "propertyType": "flat",
  "price": {
    "amount": 250000,
    "currency": "USD",
    "priceType": "sale"
  },
  "location": {
    "address": {
      "street": "123 Oak St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA",
      "fullAddress": "123 Oak St, New York, NY 10001, USA"
    },
    "coordinates": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  },
  "specifications": {
    "area": { "value": 1200, "unit": "sqft" },
    "bedrooms": 2,
    "bathrooms": 2,
    "parking": true,
    "furnished": "semi-furnished"
  },
  "amenities": ["Swimming Pool", "Gym", "Parking"],
  "contactInfo": {
    "phone": "+1234567890",
    "email": "owner@example.com",
    "preferredContactTime": "9 AM - 6 PM"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "property": {
      "propertyId": "uuid-here",
      "status": "pending",
      // ... other property details
    }
  },
  "message": "Property listed successfully. It will be reviewed by admin."
}
```

#### PUT /properties/:id
Update property (only by owner or admin).

#### DELETE /properties/:id
Delete property (only by owner or admin).

### Search Endpoints

#### POST /search/nearby
Find properties near a specific location.

**Request Body:**
```json
{
  "location": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "radius": 5000,
  "propertyType": "flat",
  "filters": {
    "minPrice": 100000,
    "maxPrice": 500000,
    "bedrooms": 2
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "properties": [...],
    "count": 15
  }
}
```

### User Management (Admin Only)

#### GET /admin/users
Get all users (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `search` - Search by name or email

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "userId": "uuid-here",
        "fullName": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "+1234567890",
        "role": "user",
        "isVerified": true,
        "propertiesCount": 3,
        "createdAt": "2023-07-20T12:00:00Z",
        "lastLogin": "2023-07-25T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

#### GET /admin/users/:userId
Get specific user details (admin only).

#### GET /admin/properties
Get all properties including pending ones (admin only).

#### PUT /admin/properties/:id/status
Update property status (admin only).

**Request Body:**
```json
{
  "status": "approved",
  "reason": "Property meets all requirements"
}
```

### Settings Endpoints

#### GET /admin/settings
Get admin settings.

#### PUT /admin/settings
Update admin settings.

**Request Body:**
```json
{
  "contactNumbers": [
    { "type": "+1234567890", "description": "Sales inquiries", "isActive": true }
  ],
  "mapSettings": {
    "defaultZoom": 12,
    "privacyRadius": 500
  },
  "propertyApprovalRequired": true
}
```

### Analytics Endpoints

#### GET /admin/analytics/overview
Get general analytics overview.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalProperties": 456,
    "pendingProperties": 23,
    "totalViews": 15678,
    "recentRegistrations": 45,
    "popularLocations": [
      { "city": "New York", "count": 123 },
      { "city": "Los Angeles", "count": 89 }
    ]
  }
}
```

#### GET /admin/analytics/properties
Get property-specific analytics.

#### GET /admin/analytics/users
Get user behavior analytics.

## Error Handling

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {...}
  }
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Rate Limiting

API requests are limited to:
- 100 requests per 15 minutes per IP address
- 1000 requests per hour for authenticated users

## File Upload

Property images can be uploaded using multipart/form-data:

```javascript
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);

fetch('/api/properties/:id/images', {
  method: 'POST',
  body: formData,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## WebSocket Events (Future Implementation)

Real-time notifications for:
- Property approval status changes
- New properties in user's preferred areas
- Admin notifications for new listings

## SDK and Client Libraries

- JavaScript SDK available in `/frontend/src/utils/api.js`
- React hooks for API calls in `/frontend/src/hooks/`
- Mobile SDK in `/mobile/src/services/api.js`
