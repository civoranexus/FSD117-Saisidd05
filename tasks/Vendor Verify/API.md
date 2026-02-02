# VendorVerify - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All requests (except `/auth/register` and `/auth/login`) require:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_vendor",
  "email": "john@example.com",
  "password": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "vendor",
  "phone": "+919876543210",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "company_name": "ABC Supplies"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": { /* User object */ }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_vendor",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "message": "Login successful",
  "access_token": "eyJhbGc...",
  "user": { /* User object */ }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "user": { /* User object */ }
}
```

### Change Password
```http
POST /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "old_password": "OldPass123",
  "new_password": "NewSecurePass123"
}

Response: 200 OK
{
  "message": "Password changed successfully"
}
```

---

## QR Code Endpoints

### Generate QR Code
```http
POST /qr/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_id": 123
}

Response: 201 Created
{
  "message": "QR code generated successfully",
  "qr_code": {
    "id": 456,
    "product_id": 123,
    "status": "generated",
    "qr_token": "...",
    "generated_at": "2024-01-27T10:30:00Z",
    "scan_count": 0
  },
  "image_path": "qr_codes/QR_456_20240127_103000.png"
}
```

### Get QR Code Details
```http
GET /qr/456
Authorization: Bearer <token>

Response: 200 OK
{
  "qr_code": { /* QR Code object */ }
}
```

### Update QR Status
```http
PATCH /qr/456/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active"
}

Response: 200 OK
{
  "message": "QR code status updated",
  "qr_code": { /* Updated QR Code object */ }
}
```

### Search QR Codes
```http
GET /qr/search?status=active&product_id=123&page=1&per_page=20
Authorization: Bearer <token>

Response: 200 OK
{
  "qr_codes": [ /* Array of QR Code objects */ ],
  "total": 45,
  "pages": 3,
  "current_page": 1
}
```

---

## Scanning & Verification Endpoints

### Verify QR Code
```http
POST /scan/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "qr_token": "..."
}

Response: 200 OK
{
  "message": "QR code verified successfully",
  "is_valid": true,
  "verification_status": "VALID",
  "product": {
    "id": 123,
    "name": "Product Name",
    "sku": "SKU123",
    "category": "Category",
    "manufacturer": "Manufacturer"
  },
  "batch": {
    "id": 789,
    "batch_number": "BATCH001",
    "manufacturing_location": "Location"
  },
  "scan_count": 1,
  "is_suspicious": false
}
```

### Get Scan History
```http
GET /scan/history?page=1&per_page=20
Authorization: Bearer <token>

Response: 200 OK
{
  "scan_history": [ /* Array of audit log objects */ ],
  "total": 50,
  "pages": 3,
  "current_page": 1
}
```

---

## Vendor Endpoints

### Create Batch
```http
POST /vendor/batches
Authorization: Bearer <token>
Content-Type: application/json

{
  "batch_number": "BATCH001",
  "quantity": 1000,
  "manufacturing_location": "Mumbai",
  "distribution_center": "Delhi"
}

Response: 201 Created
{
  "message": "Batch created successfully",
  "batch": { /* Batch object */ }
}
```

### Get Vendor Batches
```http
GET /vendor/batches
Authorization: Bearer <token>

Response: 200 OK
{
  "batches": [ /* Array of batch objects */ ]
}
```

### Create Product
```http
POST /vendor/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "product_name": "Product Name",
  "product_sku": "SKU123",
  "batch_id": 789,
  "category": "Electronics",
  "manufacturer": "ABC Corp",
  "manufacturing_date": "2024-01-01",
  "expiry_date": "2025-01-01"
}

Response: 201 Created
{
  "message": "Product created successfully",
  "product": { /* Product object */ }
}
```

### Get Vendor Products
```http
GET /vendor/products
Authorization: Bearer <token>

Response: 200 OK
{
  "products": [ /* Array of product objects */ ]
}
```

### Get Vendor QR Codes
```http
GET /vendor/codes
Authorization: Bearer <token>

Response: 200 OK
{
  "qr_codes": [ /* Array of QR code objects */ ]
}
```

### Vendor Dashboard
```http
GET /vendor/dashboard
Authorization: Bearer <token>

Response: 200 OK
{
  "dashboard": {
    "total_batches": 5,
    "total_products": 23,
    "total_qr_codes": 500,
    "total_scans": 1234,
    "status_breakdown": {
      "generated": 100,
      "active": 300,
      "used": 100
    }
  }
}
```

---

## Admin Endpoints

### List Users
```http
GET /admin/users?role=vendor&active=true&page=1&per_page=20
Authorization: Bearer <token>

Response: 200 OK
{
  "users": [ /* Array of user objects */ ],
  "total": 50,
  "pages": 3,
  "current_page": 1
}
```

### Update User
```http
PATCH /admin/users/123
Authorization: Bearer <token>
Content-Type: application/json

{
  "is_active": false,
  "is_verified": true,
  "role": "admin"
}

Response: 200 OK
{
  "message": "User updated successfully",
  "user": { /* Updated user object */ }
}
```

### Get Audit Logs
```http
GET /admin/audit-logs?action=qr_scanned&suspicious_only=false&page=1&per_page=50
Authorization: Bearer <token>

Response: 200 OK
{
  "audit_logs": [ /* Array of audit log objects */ ],
  "total": 10000,
  "pages": 200,
  "current_page": 1
}
```

### Get Verification Stats
```http
GET /admin/reports/verification-stats?days=30
Authorization: Bearer <token>

Response: 200 OK
{
  "verification_stats": {
    "period_days": 30,
    "total_scans": 5000,
    "successful_scans": 4900,
    "failed_scans": 100,
    "success_rate": 98.0,
    "suspicious_activities": 5
  }
}
```

### Get Security Alerts
```http
GET /admin/reports/security-alerts
Authorization: Bearer <token>

Response: 200 OK
{
  "security_alerts": [ /* Array of suspicious audit logs */ ]
}
```

### Admin Dashboard
```http
GET /admin/dashboard
Authorization: Bearer <token>

Response: 200 OK
{
  "dashboard": {
    "users": {
      "total": 100,
      "vendors": 30,
      "verifiers": 60,
      "admins": 10
    },
    "system": {
      "total_batches": 50,
      "total_products": 500,
      "total_qr_codes": 5000,
      "total_scans": 50000
    },
    "activity": {
      "last_24h_logs": 2000
    }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid username or password"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "QR code not found"
}
```

### 409 Conflict
```json
{
  "message": "Username already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "An error occurred: ..."
}
```
