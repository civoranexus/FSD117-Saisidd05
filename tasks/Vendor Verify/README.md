# 🏢 Civora Nexus – Smart QR Authentication System

## Project Overview

**Civora Nexus** is an enterprise-grade full-stack solution for secure vendor authentication and product verification using advanced QR code technology. Developed as part of the **CivoraX Internship Program**, this system provides comprehensive supply chain transparency and vendor credential verification.

**Project ID:** FSD117  
**Domain:** Full Stack Development (Authentication/Security/Inventory Tracking)  
**Organization:** Civora Nexus Pvt. Ltd.  
**Program:** CivoraX Internship Program  
**Solution Provider:** Civora Nexus Development Team

## Key Objectives

- ✅ Enterprise-grade secure authentication for Civora Nexus stakeholders
- ✅ Cryptographically secure QR code generation and management
- ✅ Real-time verification with geolocation tracking
- ✅ Complete audit logging for compliance
- ✅ Supply chain transparency and vendor credential verification
- ✅ Professional Civora Nexus branded interface

## Project Architecture

### System Components

1. **Backend (Flask)**
   - RESTful API endpoints
   - Database management with SQLAlchemy
   - JWT-based authentication
   - QR code generation and validation
   - Audit logging and security monitoring

2. **Frontend (React)**
   - User authentication interfaces
   - Vendor dashboard
   - QR code scanner interface
   - Admin management console
   - Responsive design for mobile and desktop

3. **Database (SQLite)**
   - User management (Vendor/Verifier/Admin)
   - Product and batch tracking
   - QR code storage and status management
   - Audit logs with geolocation and IP tracking

## Core Modules

### 1. User & Authentication Module
- Secure user registration and login
- Password management with validation
- Role-based access control (RBAC)
- Session management with JWT tokens

### 2. QR Code Generation & Linking Module
- Cryptographically secure QR code generation
- Product/batch linking
- Status management (Generated, Printed, Active, Used, Revoked)

### 3. Mobile Scanning & Verification Module
- Real-time QR code verification
- Product detail display upon successful scan
- Verification status feedback (Valid/Invalid/Already Used)

### 4. Security & Audit Logging Module
- Complete audit trail of all scan attempts
- IP address and geolocation tracking
- Suspicious activity detection
- Security alerts and reports

### 5. Vendor Management Module
- Product and batch creation
- QR code generation interface
- Scan history tracking
- Vendor dashboard with analytics

### 6. Admin Dashboard
- User management and monitoring
- System analytics and reporting
- Security alerts
- System settings management

## Database Schema

### Users Table
- User identification and authentication
- Role-based fields (vendor, verifier, admin)
- Contact and location information
- Activity tracking (created_at, last_login)

### Products Table
- Product details (name, SKU, category)
- Manufacturing information
- Batch association
- Creator tracking

### Batches Table
- Batch identification
- Quantity and location information
- Vendor association
- Timestamp tracking

### QR Codes Table
- QR token and hash storage
- Product/vendor association
- Status tracking
- Scan metrics (count, first_scan, last_scan)
- Expiry management

### Audit Logs Table
- Complete action history
- User and QR code association
- Timestamp and location data
- Suspicious activity flagging

## Installation & Setup

### Backend Setup

```bash
cd VendorVerify/backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Initialize database
python -c "from app import create_app; create_app()"

# Run the server
python app.py
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd VendorVerify/frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start development server
npm start
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### QR Code Management
- `POST /api/qr/generate` - Generate new QR code
- `GET /api/qr/<id>` - Get QR code details
- `PATCH /api/qr/<id>/status` - Update QR status
- `GET /api/qr/search` - Search QR codes

### Scanning & Verification
- `POST /api/scan/verify` - Verify QR code
- `GET /api/scan/history` - Get scan history

### Vendor Features
- `POST /api/vendor/batches` - Create batch
- `GET /api/vendor/batches` - Get vendor batches
- `POST /api/vendor/products` - Create product
- `GET /api/vendor/products` - Get vendor products
- `GET /api/vendor/codes` - Get vendor QR codes
- `GET /api/vendor/dashboard` - Vendor dashboard stats

### Admin Features
- `GET /api/admin/users` - List all users
- `PATCH /api/admin/users/<id>` - Update user
- `GET /api/admin/audit-logs` - Get audit logs
- `GET /api/admin/reports/verification-stats` - Verification statistics
- `GET /api/admin/reports/security-alerts` - Security alerts
- `GET /api/admin/dashboard` - Admin dashboard

## Security Features

1. **Secure Authentication**
   - Password hashing with werkzeug
   - JWT token-based authentication
   - Session management

2. **Audit Logging**
   - Every action logged with timestamp
   - IP address and geolocation tracking
   - User agent recording

3. **Suspicious Activity Detection**
   - Multiple scans in short timeframe
   - Impossible geographic distances
   - Duplicate scan prevention

4. **Data Protection**
   - Cryptographic hash for QR tokens
   - SQL injection prevention via SQLAlchemy ORM
   - CORS protection

## Design & Branding Guidelines

- **Primary Color:** #003366 (Civora Nexus Blue)
- **Secondary Color:** #0066CC
- **Success State:** #4CAF50 (Green)
- **Error State:** #F44336 (Red)
- **Font:** System fonts (Segoe UI, Roboto, etc.)
- **Layout:** Responsive, mobile-first design
- **Branding:** Official Civora Nexus logos and assets only

## Testing

Run tests with:
```bash
# Backend tests
python -m pytest backend/tests/

# Frontend tests
npm test
```

## Deployment

### Backend
```bash
# Use production WSGI server
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
# Build for production
npm run build

# Deploy build folder to static hosting
```

## Contributing

1. Follow PEP 8 for Python code
2. Use React best practices for frontend code
3. Write comprehensive commit messages
4. Maintain the security and audit logging standards
5. Test all features before pushing

## License

Civora Nexus Pvt. Ltd. - CivoraX Internship Program

## Contact

- **Company:** Civora Nexus Pvt. Ltd.
- **Email:** info@civoranexus.com
- **Phone:** +91-7350 675192
- **Address:** Sangamner, Maharashtra – 422605, India
