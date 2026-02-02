# VendorVerify - System Architecture Documentation

## Technology Stack

### Backend
- **Framework:** Flask 2.3.2
- **Database:** SQLite with SQLAlchemy ORM
- **Authentication:** Flask-JWT-Extended
- **QR Generation:** qrcode, Pillow
- **Security:** werkzeug, cryptography
- **CORS:** Flask-CORS

### Frontend
- **Framework:** React 18.2
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **QR Features:** qrcode.react, react-qr-reader
- **Styling:** CSS3 with custom design system

### Infrastructure
- **Version Control:** Git/GitHub
- **Database:** SQLite (development), PostgreSQL (production)
- **Deployment:** Gunicorn (backend), Static hosting (frontend)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username VARCHAR(120) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(120),
  last_name VARCHAR(120),
  role VARCHAR(20) DEFAULT 'verifier',
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  company_name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME
)
```

### QR Codes Table
```sql
CREATE TABLE qr_codes (
  id INTEGER PRIMARY KEY,
  qr_token VARCHAR(255) UNIQUE NOT NULL,
  qr_hash VARCHAR(255) UNIQUE NOT NULL,
  product_id INTEGER NOT NULL FOREIGN KEY,
  vendor_id INTEGER NOT NULL FOREIGN KEY,
  status VARCHAR(20) DEFAULT 'generated',
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  first_scan_at DATETIME,
  last_scan_at DATETIME,
  scan_count INTEGER DEFAULT 0,
  qr_image_path VARCHAR(500)
)
```

### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY,
  action VARCHAR(50) NOT NULL,
  user_id INTEGER FOREIGN KEY,
  qr_code_id INTEGER FOREIGN KEY,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  latitude FLOAT,
  longitude FLOAT,
  geolocation VARCHAR(500),
  result VARCHAR(50),
  details JSON,
  is_suspicious BOOLEAN DEFAULT FALSE
)
```

## API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { /* Resource data */ },
  "code": 200
}
```

### Error Response
```json
{
  "message": "Error description",
  "code": 400 // HTTP status code
}
```

## Authentication Flow

1. User registers with credentials
2. Password hashed with werkzeug
3. User logs in with username/password
4. System returns JWT access token
5. Token stored in localStorage
6. All API requests include Authorization header
7. Backend validates token and checks user role

## QR Code Verification Flow

1. User scans QR code via mobile/web scanner
2. System extracts QR token
3. Backend generates hash and looks up in database
4. Checks QR validity:
   - Not already used
   - Not revoked
   - Not expired
5. Detects suspicious activity
6. Logs scan attempt with full details
7. Returns verification result with product info
8. Updates scan count and timestamp

## Security Architecture

### Authentication & Authorization
- JWT tokens with 24-hour expiry
- Role-based access control
- Password minimum 8 characters, uppercase + digit required
- Secure session management

### Data Protection
- Passwords hashed with werkzeug.security
- QR tokens stored as cryptographic hashes
- Database encrypted in transit (HTTPS in production)
- Sensitive data excluded from logs

### Audit & Logging
- Every action logged with timestamp
- IP address and user agent tracking
- Geolocation recording (IP-based)
- Suspicious activity flagging
- Tamper-evident audit trail

### Suspicious Activity Detection
- Multiple scans from same QR in <5 seconds
- Geographic impossibilities (distance/time)
- Duplicate scans of same code
- Unusual access patterns

## Deployment Architecture

### Production Environment
```
┌─────────────────────────────────────────┐
│         CDN / Load Balancer             │
├─────────────────────────────────────────┤
│   Frontend (React)      Backend (Flask) │
│   Static Hosting        Gunicorn WSGI   │
├─────────────────────────────────────────┤
│   PostgreSQL Database (Encrypted)       │
├─────────────────────────────────────────┤
│   Redis Cache (Session Store)           │
└─────────────────────────────────────────┘
```

## Performance Optimization

1. **Database Indexes**
   - username, email, role (Users)
   - qr_token, qr_hash, status (QR Codes)
   - timestamp, action (Audit Logs)

2. **Caching**
   - Session cache with Redis
   - QR code status cache
   - User role cache

3. **Query Optimization**
   - Lazy loading of relationships
   - Pagination for large result sets
   - Efficient JOIN queries

## Scalability Considerations

1. **Horizontal Scaling**
   - Stateless backend with JWT
   - Shared database across instances
   - Redis for session synchronization

2. **Vertical Scaling**
   - Database optimization
   - Caching layers
   - Connection pooling

3. **Future Enhancements**
   - Microservices architecture
   - Message queue for async logging
   - CDN for static assets
   - Database sharding by vendor

## Monitoring & Logging

- Access logs (request/response)
- Application logs (errors, warnings)
- Audit logs (business events)
- Performance metrics
- Security alerts
