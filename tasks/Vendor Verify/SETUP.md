# 🏢 Civora Nexus Setup Guide

Smart QR Authentication & Vendor Verification System

## Quick Start

### Step 1: Clone/Extract Project
```bash
cd e:\New folder\VendorVerify
```

### Step 2: Backend Setup (Civora Nexus API)

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment (Windows)
.venv\Scripts\activate

# Or on Mac/Linux
source .venv/bin/activate

# Install dependencies for Civora Nexus
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Edit .env with your settings
# IMPORTANT: Change SECRET_KEY and JWT_SECRET_KEY for production!
```

### Step 3: Initialize Civora Nexus Database

```bash
# The database is created automatically when you run the app
# But you can initialize it manually:
python -c "from app import create_app; app = create_app(); print('Civora Nexus Database initialized!')"
```

### Step 4: Run Backend Server

```bash
python app.py
# Server will run on http://localhost:5000
```

### Step 5: Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo REACT_APP_API_URL=http://localhost:5000 > .env

# Start development server
npm start
# App will run on http://localhost:3000
```

## Default User Credentials

After creating users through registration, you can use:

**Test Vendor Account:**
- Username: `vendor_test`
- Password: `VendorTest123`
- Role: Vendor

**Test Verifier Account:**
- Username: `verifier_test`
- Password: `VerifierTest123`
- Role: Verifier

**Test Admin Account:**
- Username: `admin_test`
- Password: `AdminTest123`
- Role: Admin

## Creating Test Users

### Using the API

```bash
# Register a vendor
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "vendor_test",
    "email": "vendor@test.com",
    "password": "VendorTest123",
    "first_name": "Test",
    "last_name": "Vendor",
    "role": "vendor",
    "company_name": "Test Company"
  }'

# Register a verifier
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "verifier_test",
    "email": "verifier@test.com",
    "password": "VerifierTest123",
    "first_name": "Test",
    "last_name": "Verifier",
    "role": "verifier"
  }'
```

### Using Python Script

Create `seed_users.py` in the backend directory:

```python
from app import create_app, db
from app.models import User

app = create_app()

with app.app_context():
    # Create test vendor
    vendor = User(
        username='vendor_test',
        email='vendor@test.com',
        first_name='Test',
        last_name='Vendor',
        role='vendor',
        company_name='Test Company',
        is_verified=True,
        is_active=True
    )
    vendor.set_password('VendorTest123')
    db.session.add(vendor)

    # Create test verifier
    verifier = User(
        username='verifier_test',
        email='verifier@test.com',
        first_name='Test',
        last_name='Verifier',
        role='verifier',
        is_verified=True,
        is_active=True
    )
    verifier.set_password('VerifierTest123')
    db.session.add(verifier)

    # Create test admin
    admin = User(
        username='admin_test',
        email='admin@test.com',
        first_name='Test',
        last_name='Admin',
        role='admin',
        is_verified=True,
        is_active=True
    )
    admin.set_password('AdminTest123')
    db.session.add(admin)

    db.session.commit()
    print("Test users created successfully!")
```

Run: `python seed_users.py`

## Project Structure

```
VendorVerify/
├── backend/
│   ├── app/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Utility functions
│   │   └── __init__.py      # Flask app factory
│   ├── app.py               # Entry point
│   ├── requirements.txt     # Dependencies
│   └── .env.example         # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   ├── api/             # API client
│   │   └── App.js           # Main app
│   ├── public/              # Static assets
│   └── package.json         # Dependencies
│
├── docs/
│   ├── README.md            # Project overview
│   ├── ARCHITECTURE.md      # System design
│   ├── SECURITY.md          # Security details
│   └── API.md               # API documentation
│
└── .gitignore              # Git ignore rules
```

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Change port in app.py or use:
flask run --port 5001
```

**Database locked error:**
```bash
# Delete the database and reinitialize
rm vendorverify.db
python -c "from app import create_app; create_app()"
```

**Module not found error:**
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Use different port
PORT=3001 npm start
```

**CORS errors:**
- Check backend CORS configuration
- Ensure `REACT_APP_API_URL` matches backend URL

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

### Backend (.env)

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-change-in-production
DATABASE_URL=sqlite:///vendorverify.db
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production
GEOIP_DB_PATH=./GeoLite2-City.mmdb
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_VERSION=1.0.0
```

## Testing Features

### Create a Batch (as Vendor)
1. Login with vendor account
2. Go to Vendor Dashboard
3. Create Batch with:
   - Batch Number: BATCH001
   - Quantity: 1000
   - Manufacturing Location: Mumbai

### Create a Product
1. In Vendor Dashboard
2. Create Product with:
   - Product Name: Test Product
   - Product SKU: SKU001
   - Select created batch
   - Add manufacturing/expiry dates

### Generate QR Code
1. Select the product
2. Click "Generate QR Code"
3. View QR image and save

### Scan QR Code (as Verifier)
1. Login with verifier account
2. Go to Scan page
3. Scan or paste QR code
4. View verification result

## Building for Production

### Backend
```bash
cd backend

# Create production build
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
cd frontend

# Create optimized build
npm run build

# Deploy 'build' folder to static hosting
# Example: AWS S3, GitHub Pages, Vercel, etc.
```

## Performance Tips

1. **Enable database indexing** - Already done in models
2. **Use caching** - Add Redis for sessions
3. **Optimize images** - Compress QR code images
4. **Lazy load components** - Split code with React.lazy()
5. **Monitor performance** - Use browser DevTools

## Security Checklist for Production

- [ ] Change SECRET_KEY and JWT_SECRET_KEY
- [ ] Enable HTTPS
- [ ] Set FLASK_ENV=production
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure firewall rules
- [ ] Set up monitoring/logging
- [ ] Use PostgreSQL instead of SQLite
- [ ] Store secrets in environment only

## Getting Help

- Check API documentation in `/docs/API.md`
- Review architecture in `/docs/ARCHITECTURE.md`
- See security info in `/docs/SECURITY.md`
- Check backend logs for errors
- Use browser DevTools for frontend debugging

## Next Steps

1. Implement advanced features (MFA, geolocation validation)
2. Set up comprehensive testing
3. Create mobile app version
4. Set up CI/CD pipeline
5. Deploy to production
6. Monitor and optimize performance
