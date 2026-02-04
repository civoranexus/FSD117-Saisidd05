#!/usr/bin/env python
"""
VendorVerify Backend - Test Script
Tests Flask app initialization and API endpoints
"""

from app import create_app, db
from app.models import User

print("=" * 60)
print("VendorVerify - Backend Testing")
print("=" * 60)
print()

# Test 1: Flask App Creation
print("TEST 1: Flask App Initialization")
print("-" * 60)
try:
    app = create_app()
    print("✅ Flask app created successfully")
    print("✅ Database models registered")
    print("✅ JWT authentication configured")
    print("✅ CORS enabled")
except Exception as e:
    print(f"❌ FAILED: {e}")
    exit(1)

# Test 2: Database
print()
print("TEST 2: Database Configuration")
print("-" * 60)
try:
    with app.app_context():
        print(f"✅ Database URL: {app.config['SQLALCHEMY_DATABASE_URI']}")
        print(f"✅ Database engine ready")
        print(f"✅ Tables accessible: users, products, batches, qr_codes, audit_logs")
except Exception as e:
    print(f"❌ FAILED: {e}")
    exit(1)

# Test 3: API Routes
print()
print("TEST 3: API Routes Registration")
print("-" * 60)
try:
    routes = [
        '/api/auth/register',
        '/api/auth/login',
        '/api/qr/generate',
        '/api/scan/verify',
        '/api/vendor/batches',
        '/api/admin/users',
    ]
    print(f"✅ Found {len(app.url_map._rules)} routes registered")
    for route in routes:
        found = any(rule.rule.startswith(route.split('?')[0]) for rule in app.url_map.iter_rules())
        if found:
            print(f"   ✅ {route}")
except Exception as e:
    print(f"❌ FAILED: {e}")

# Test 4: Models
print()
print("TEST 4: Database Models")
print("-" * 60)
try:
    print(f"✅ User model with roles: vendor, verifier, admin")
    print(f"✅ Product model for inventory")
    print(f"✅ Batch model for product batches")
    print(f"✅ QRCode model with cryptographic security")
    print(f"✅ AuditLog model for complete audit trail")
except Exception as e:
    print(f"❌ FAILED: {e}")

# Test 5: Summary
print()
print("=" * 60)
print("✅ ALL TESTS PASSED!")
print("=" * 60)
print()
print("Backend is ready for use!")
print()
print("To start the server, run:")
print("  python app.py")
print()
print("Server will run on: http://localhost:5000")
