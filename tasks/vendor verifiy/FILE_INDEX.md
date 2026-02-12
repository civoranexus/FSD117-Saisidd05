# VendorVerify Project - File Index

## Root Directory Files
- **README.md** - Project overview, features, and quick reference
- **SETUP.md** - Installation and setup instructions for development
- **PROJECT_COMPLETION_REPORT.md** - Comprehensive project completion summary
- **.gitignore** - Git ignore configuration for version control

---

## Backend (`/backend/`)

### Core Application
- **app.py** - Flask application entry point and server launcher

### Configuration & Dependencies
- **requirements.txt** - Python package dependencies (13 packages)
- **.env** - Environment variables (development)
- **.env.example** - Environment template for setup

### Application Package (`/backend/app/`)
- **__init__.py** - Flask app factory and configuration

### Models (`/backend/app/models/`)
Database models defining the application schema:
- **__init__.py** - Model exports
- **user.py** - User model with roles (Vendor, Verifier, Admin)
- **product.py** - Product and Batch models for inventory
- **qr_code.py** - QR Code model with cryptographic security
- **audit_log.py** - Audit Log model for security tracking

### Routes/API (`/backend/app/routes/`)
RESTful API endpoints:
- **__init__.py** - Routes package initialization
- **auth.py** - Authentication endpoints (register, login, password)
- **qr.py** - QR code management endpoints
- **scanning.py** - QR verification and scanning endpoints
- **vendor.py** - Vendor-specific endpoints (batches, products, dashboard)
- **admin.py** - Admin management and reporting endpoints

### Utilities (`/backend/app/utils/`)
Helper functions and utilities:
- **__init__.py** - Utils package initialization
- **qr_generator.py** - QR code generation with Civora branding
- **security.py** - Security utilities (geolocation, suspicious activity detection)

---

## Frontend (`/frontend/`)

### Configuration & Dependencies
- **package.json** - Node.js dependencies and scripts
- **.gitignore** - Git ignore for Node projects
- **.env.example** - Environment template

### Source Code (`/frontend/src/`)

**Main Application Files:**
- **index.js** - React application entry point
- **index.css** - Global styles and Civora Nexus color palette
- **App.js** - Main app component with routing
- **App.css** - Application-level styles

**Context (`/src/context/`):**
- **AuthContext.js** - React Context for authentication state management

**API (`/src/api/`):**
- **axiosConfig.js** - Axios HTTP client with JWT interceptors

**Pages (`/src/pages/`):**
- **LoginPage.js** - User login interface
- **LoginPage.css** - Login page styling
- **RegisterPage.js** - User registration interface
- **RegisterPage.css** - Registration page styling
- **VendorDashboard.js** - Vendor dashboard with analytics
- **VerifierScanPage.js** - QR code scanning interface
- **AdminDashboard.js** - Admin system console
- **NotFoundPage.js** - 404 error page

**Components (`/src/components/`):**
- **Navigation.js** - Application navbar/header
- **Navigation.css** - Navigation styling

**Public Assets (`/frontend/public/`):**
- **index.html** - HTML template
- **manifest.json** - PWA manifest configuration

---

## Documentation (`/docs/`)

### Architecture & Design
- **ARCHITECTURE.md** - System architecture, database schema, and design patterns
  - Technology stack details
  - Complete database schema with SQL
  - API response formats
  - Authentication and QR verification flows
  - Deployment architecture
  - Performance optimization strategies
  - Scalability considerations

### Security
- **SECURITY.md** - Security implementation guide
  - Password security policies
  - JWT implementation details
  - RBAC definitions
  - QR code security
  - Audit logging details
  - Suspicious activity detection rules
  - Data protection measures
  - Input validation strategies
  - API security configuration
  - Compliance guidelines
  - Security testing procedures
  - Incident response plan

### API Reference
- **API.md** - Complete API documentation
  - Authentication endpoints
  - QR code management endpoints
  - Scanning & verification endpoints
  - Vendor management endpoints
  - Admin management endpoints
  - Error response formats
  - Full endpoint examples with request/response

---

## Project Statistics

### Backend
- **Languages:** Python
- **Framework:** Flask
- **Models:** 4 (User, Product, Batch, QRCode, AuditLog)
- **API Routes:** 25+ endpoints
- **Database Tables:** 5
- **Utility Modules:** 2

### Frontend
- **Language:** JavaScript (React)
- **Components:** 8+ pages/components
- **Routes:** 6+ main routes
- **Context Providers:** 1 (AuthContext)
- **API Client:** Axios with interceptors

### Documentation
- **README:** Project overview (500+ lines)
- **SETUP:** Installation guide (300+ lines)
- **ARCHITECTURE:** Technical documentation (400+ lines)
- **SECURITY:** Security guide (300+ lines)
- **API:** Endpoint documentation (500+ lines)
- **PROJECT_COMPLETION_REPORT:** Summary (200+ lines)

---

## Key Features by File

### Authentication & Security
- **user.py** - User model with password hashing
- **auth.py** - Registration, login, password management
- **security.py** - Suspicious activity detection, geolocation
- **AuthContext.js** - Frontend authentication state

### QR Code System
- **qr_code.py** - QR model with cryptographic tokens
- **qr.py** - QR generation and management API
- **qr_generator.py** - Image generation with Civora branding
- **scanning.py** - Verification endpoint

### Database & Models
- **product.py** - Product and Batch models
- **audit_log.py** - Complete audit trail model
- **User roles:** Vendor, Verifier, Admin

### Admin Features
- **admin.py** - User management, analytics, security monitoring
- **AdminDashboard.js** - Admin console UI

### Vendor Features
- **vendor.py** - Product/batch/code management API
- **VendorDashboard.js** - Vendor dashboard UI

### Scanning & Verification
- **scanning.py** - Real-time verification API
- **VerifierScanPage.js** - Scanner UI

---

## How to Navigate This Project

1. **Getting Started:** Start with `README.md` and `SETUP.md`
2. **Backend Development:** See `/backend/app/routes/` for API endpoints
3. **Frontend Development:** See `/frontend/src/pages/` for UI components
4. **Database Schema:** See `/docs/ARCHITECTURE.md`
5. **Security Details:** See `/docs/SECURITY.md`
6. **API Reference:** See `/docs/API.md`
7. **Deployment:** See `SETUP.md` production section

---

## Development Workflow

### Adding a New API Endpoint
1. Create/modify route in `/backend/app/routes/`
2. Use models from `/backend/app/models/`
3. Add utility functions to `/backend/app/utils/`
4. Document in `/docs/API.md`
5. Add frontend components in `/frontend/src/pages/`

### Adding a New Frontend Page
1. Create component in `/frontend/src/pages/`
2. Add route in `/frontend/src/App.js`
3. Add styling with CSS file
4. Use AuthContext for user data
5. Use axios API client from `/frontend/src/api/`

### Testing Locally
1. Follow setup in `SETUP.md`
2. Backend runs on `http://localhost:5000`
3. Frontend runs on `http://localhost:3000`

---

## Important Notes

- **Secret Keys:** Change SECRET_KEY and JWT_SECRET_KEY in production
- **Database:** SQLite for development, PostgreSQL for production
- **Branding:** All UI uses official Civora Nexus color palette (#003366)
- **Security:** Complete audit logging implemented in audit_log.py
- **API:** All endpoints documented in docs/API.md

---

**Last Updated:** January 27, 2026  
**Project Status:** ✅ COMPLETE
