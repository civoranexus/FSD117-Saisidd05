# VendorVerify - Security Implementation Guide

## Overview

VendorVerify implements comprehensive security measures across authentication, authorization, audit logging, and data protection.

## Authentication Security

### Password Security
- Minimum 8 characters
- Requires uppercase letter
- Requires digit
- Hashed with werkzeug's `generate_password_hash()`
- Never stored in plaintext

### JWT Implementation
```python
# Token creation
access_token = create_access_token(identity=user.id)

# Token includes:
# - User ID
# - Issued At (iat)
# - Expiration Time (exp) - 24 hours

# Request header:
# Authorization: Bearer <token>
```

### Session Management
- Sessions stored server-side
- CORS enabled only for frontend domain
- Tokens invalidated on logout
- Auto-logout on token expiry

## Authorization (RBAC)

### Role Definitions

**Vendor**
- Create and manage products
- Generate QR codes
- View their QR code analytics
- Cannot access other vendors' data

**Verifier (Consumer/Staff)**
- Scan and verify QR codes
- View verification results
- Cannot create products or codes

**Admin**
- Full system access
- User management
- System analytics
- Security monitoring

## QR Code Security

### Token Generation
```python
# Cryptographically secure random token
qr_token = secrets.token_urlsafe(48)  # 48-byte random value

# Hash for storage
qr_hash = hashlib.sha256(qr_token.encode()).hexdigest()

# Only hash stored in database
# Token only returned to user once
```

### QR Validation Rules
1. **Status Check** - Must not be Used or Revoked
2. **Expiry Check** - Must not be past expiry_at
3. **Existence Check** - Must exist in database
4. **Ownership Check** - Vendor must own QR code

## Audit Logging

### Logged Actions
- User registration/login
- QR generation
- QR scanning
- Code status changes
- Admin actions

### Log Entry Contents
```python
{
  'action': 'qr_scanned',  # Action type
  'user_id': 123,          # Who performed action
  'qr_code_id': 456,       # What was affected
  'timestamp': '2024-01-27T10:30:00Z',
  'ip_address': '192.168.1.1',
  'user_agent': 'Mozilla/5.0...',
  'latitude': 19.2183,
  'longitude': 72.9781,
  'geolocation': 'Mumbai, India',
  'result': 'success',  # success, failed, invalid
  'is_suspicious': False,
  'details': {}  # Additional context
}
```

## Suspicious Activity Detection

### Detection Rules

**Rapid Scanning**
- Multiple scans of same QR in <5 seconds
- Flag: `is_suspicious = True`
- Action: Log and alert admin

**Duplicate Usage**
- Attempt to scan already-used code
- Flag: `is_suspicious = True`
- Action: Reject scan, log event

**Geographic Anomalies**
- Same code scanned from impossible distances
- Example: Same code in Mumbai then London in 10 minutes
- Flag: `is_suspicious = True`
- Action: Log, alert admin, possible revocation

### Response to Suspicious Activity
1. Log event with `is_suspicious = True`
2. Notify admin dashboard
3. For critical issues: Auto-revoke QR code
4. Track patterns for investigation

## Data Protection

### In-Transit Protection
- HTTPS/TLS required (production)
- Encrypted request/response bodies
- Secure cookies with HttpOnly flag
- CORS headers properly configured

### At-Rest Protection
- Database encryption (production)
- Password hashing
- Sensitive fields masked in logs
- QR tokens hashed

### Sensitive Data Handling
```python
# Never log
- Passwords
- JWT tokens
- QR tokens (log hash instead)

# Mask in logs
- Email addresses
- Phone numbers
- Full IP addresses (last octet only)
```

## Input Validation

### User Input
```python
# Email validation
- Valid format check
- No injection characters

# Password validation
- Length check
- Character complexity

# QR Token validation
- Format check
- Length verification
- Exists in database
```

### SQL Injection Prevention
- SQLAlchemy ORM prevents SQL injection
- Parameterized queries
- Input escaping

## API Security

### CORS Configuration
```python
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",  # dev
            "https://vendorverify.app"  # production
        ],
        "methods": ["GET", "POST", "PATCH", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

### Rate Limiting (Recommended)
```python
# Limit failed login attempts
# 5 failed attempts → 15 minute lockout

# Limit QR scanning
# 10 scans/minute per user
```

### Error Handling
- Don't expose stack traces to users
- Generic error messages for auth failures
- Log detailed errors server-side
- Monitor error patterns

## Compliance

### Data Privacy
- GDPR compliance (EU users)
- Right to access personal data
- Right to data deletion
- Audit trail for compliance

### Audit Trail
- Non-repudiation (actions tied to users)
- Immutable log entries
- Timestamp accuracy
- Complete action history

## Security Testing

### Regular Testing
- Penetration testing
- SQL injection testing
- Authentication bypass testing
- Authorization bypass testing

### Code Security
- Dependency scanning
- Static code analysis
- Vulnerability patching
- Security code reviews

## Incident Response

### Breach Detection
- Monitor audit logs for anomalies
- Alert on multiple failed logins
- Alert on QR code abuse
- Track suspicious IPs

### Response Procedures
1. Detect incident
2. Isolate affected systems
3. Assess impact
4. Notify users if needed
5. Document findings
6. Implement fixes

## Security Checklist

- [ ] HTTPS enabled in production
- [ ] Database encryption enabled
- [ ] Strong password policy enforced
- [ ] Rate limiting implemented
- [ ] Audit logging working
- [ ] Security monitoring active
- [ ] Regular backups scheduled
- [ ] Incident response plan ready
- [ ] Staff security trained
- [ ] Dependencies updated
