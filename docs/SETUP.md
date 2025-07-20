# Real Estate Application Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd RealEstateApplication
```

### 2. Install Dependencies for All Projects
```bash
npm run install-all
```

Or install individually:
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Install admin panel dependencies
cd ../admin && npm install

# Install mobile app dependencies (if using Expo)
cd ../mobile && npm install
```

### 3. Environment Configuration

#### Backend Environment
1. Copy the example environment file:
```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your configurations:
```env
MONGODB_URI=mongodb://localhost:27017/realestate
JWT_SECRET=your_super_secure_jwt_secret_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
ADMIN_EMAIL=admin@realestate.com
ADMIN_PASSWORD=secure_admin_password
```

#### Frontend Environment
Create `frontend/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Admin Environment
Create `admin/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Database Setup

#### MongoDB Local Setup
1. Start MongoDB service:
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Ubuntu/Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

2. The application will automatically create the database and collections on first run.

#### MongoDB Atlas Setup (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### 5. Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Create credentials (API Key)
5. Add the API key to your environment files

### 6. Start the Applications

#### Start All Services (Development)
From the root directory:
```bash
npm run dev
```

This will start:
- Backend API server on http://localhost:5000
- Frontend web app on http://localhost:3000
- Admin panel on http://localhost:3001

#### Start Services Individually

**Backend:**
```bash
cd backend
npm start
# or for development with nodemon
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

**Admin Panel:**
```bash
cd admin
npm start
```

**Mobile App:**
```bash
cd mobile
npm start
# Follow Expo CLI instructions to run on device/simulator
```

## Default Admin Account

After setting up, you can create an admin account using the provided admin credentials in your `.env` file.

## API Endpoints

The backend API will be available at:
- Base URL: `http://localhost:5000/api`
- Authentication: `/auth`
- Users: `/users`
- Properties: `/properties`
- Admin: `/admin`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`

2. **API Key Issues**
   - Verify Google Maps API key is valid
   - Check if required APIs are enabled

3. **Port Conflicts**
   - Change ports in package.json scripts if needed
   - Default ports: Backend (5000), Frontend (3000), Admin (3001)

4. **Dependencies Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Development Tips

1. Use MongoDB Compass for database management
2. Install React DevTools browser extension
3. Use Postman for API testing
4. Enable hot reload for faster development

## Production Deployment

For production deployment, see `DEPLOYMENT.md` (to be created).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `/docs` folder
- Review the code comments for implementation details
