#!/bin/bash
# VendorVerify - Quick Start Script

echo "=================================================="
echo "VendorVerify - Smart QR Authentication System"
echo "Quick Start Guide"
echo "=================================================="
echo ""

# Check Python
echo "Checking Python installation..."
python --version 2>/dev/null || python3 --version || echo "❌ Python not found"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
node --version || echo "❌ Node.js not found"
npm --version || echo "❌ npm not found"
echo ""

# Backend Setup
echo "=================================================="
echo "BACKEND SETUP"
echo "=================================================="
echo ""
echo "1. Installing dependencies..."
cd backend
pip install Flask Flask-SQLAlchemy Flask-JWT-Extended Flask-CORS python-dotenv werkzeug

echo ""
echo "2. Starting backend server..."
echo "   Running on: http://localhost:5000"
echo ""
python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Frontend Setup
echo ""
echo "=================================================="
echo "FRONTEND SETUP"
echo "=================================================="
echo ""
cd ../frontend

echo "1. Installing dependencies..."
npm install

echo ""
echo "2. Starting frontend..."
echo "   Running on: http://localhost:3000"
echo ""
npm start &
FRONTEND_PID=$!

echo ""
echo "=================================================="
echo "✅ VendorVerify is running!"
echo "=================================================="
echo ""
echo "Open your browser: http://localhost:3000"
echo ""
echo "TEST CREDENTIALS:"
echo "  Username: test_vendor"
echo "  Password: TestVendor123"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

wait $BACKEND_PID $FRONTEND_PID
