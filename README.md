# Real Estate Application

A comprehensive real estate platform for listing and buying properties with map integration and user management.

## Features

### User Authentication
- User registration and login system
- Unique user ID generation for each user
- Secure authentication with JWT tokens

### Main Functions
1. **LIST YOUR PROPERTY**
   - Property listing form
   - Address input with map integration
   - Property details (type, price, description, etc.)
   - Approximate location display (privacy protection)

2. **BUY A PROPERTY**
   - Location-based property search
   - Property type filtering (Plot, Flat, Commercial Floor)
   - Nearby property display with contact information
   - Admin-managed contact numbers

### Map Integration
- Interactive map showing property locations
- Privacy-focused: Shows approximate area (circle) not exact location
- Location-based search functionality

### Admin Panel
- Complete user data management
- User details, contact numbers, and locations
- Property management and approval system
- Contact number management for listings

## Tech Stack
- **Frontend**: React.js with responsive design
- **Backend**: Node.js with Express.js
- **Database**: MongoDB for user and property data
- **Maps**: Google Maps API / Mapbox
- **Authentication**: JWT tokens
- **Mobile**: React Native (cross-platform)

## Project Structure
- `/frontend` - React web application
- `/backend` - Node.js API server
- `/mobile` - React Native mobile app
- `/admin` - Admin panel interface
- `/database` - Database schemas and configurations
