# BlogHub - Full Stack Blog Application

A complete, production-ready full-stack blog application built with Express.js, MongoDB, and vanilla JavaScript. Built for Week 3 of the advanced features bootcamp covering Node.js/Express, databases, RESTful API design, and authentication.

## 🎯 Project Overview

BlogHub is a modern, fully-functional blog platform that demonstrates real-world web development practices including user authentication, RESTful API design, database management, and a beautiful responsive UI.

**Live Demo:** http://localhost:3000

## ✨ Recent Updates (January 2026)

✅ **Modern UI Redesign**
- Beautiful gradient backgrounds (purple/blue theme)
- Smooth animations and transitions
- Enhanced form styling with focus states
- Mobile-responsive design
- Emoji icons for visual appeal

✅ **Database Seeding**
- 11 sample blog posts with realistic content
- 4 pre-created demo user accounts
- Posts dated across 30 days for authentic timeline
- Topics covering web development best practices

✅ **Frontend Enhancements**
- Vanilla JavaScript implementation (no build tools needed)
- Real-time post updates (auto-refresh every 5 seconds)
- Smooth error and success messaging
- Professional UI/UX with hover effects

✅ **Backend Optimization**
- JWT-based authentication
- Password hashing with bcrypt
- Protected API endpoints
- Error handling and validation

## 📁 Project Structure

```
blog-app/
├── backend/
│   ├── models/
│   │   ├── User.js         # User schema with password hashing
│   │   └── Post.js         # Post schema with author reference
│   ├── routes/
│   │   ├── auth.js         # Login & Register endpoints
│   │   └── posts.js        # Post CRUD operations
│   ├── middleware/
│   │   └── auth.js         # JWT verification middleware
│   ├── server.js           # Express server setup
│   ├── seed.js             # Database seeding script
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment configuration
├── frontend/
│   ├── src/                # React source (optional)
│   └── package.json        # Frontend dependencies
├── index.html              # Main HTML application (no build needed!)
├── START.bat               # Quick start script
├── QUICKSTART.md           # Quick setup guide
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (installed and running)
- npm or yarn

### 1️⃣ **Automatic Start** (Recommended)
```bash
cd "c:\Users\Admin\OneDrive\Desktop\1\game\New folder\blog-app"
START.bat
```

### 2️⃣ **Manual Start**

**Terminal 1 - Backend:**
```bash
cd backend
npm install
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd ..
python -m http.server 3000 --bind 127.0.0.1
```

### 3️⃣ **Access the App**
- Open http://localhost:3000 in your browser
- Login or create an account

## 🔐 Demo Accounts

Pre-seeded accounts ready to use:

| Email | Password | Posts |
|-------|----------|-------|
| sarah@example.com | password123 | 4 |
| mike@example.com | password123 | 3 |
| emma@example.com | password123 | 2 |
| alex@example.com | password123 | 2 |

## 📚 Features

### ✅ Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt (10 rounds)
- 7-day token expiration
- Protected API endpoints

### ✅ Blog Management
- Create new blog posts
- View all posts with author information
- Delete own posts
- Real-time post updates
- Chronological post ordering

### ✅ User Experience
- Modern gradient UI with animations
- Responsive design for mobile/tablet/desktop
- Form validation and error messages
- Success notifications
- Smooth transitions and hover effects

### ✅ Technical Excellence
- RESTful API design
- CORS enabled for cross-origin requests
- Mongoose ODM for MongoDB
- Express.js middleware architecture
- Environment-based configuration

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response: { token: "...", user: { id, name, email } }
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: { token: "...", user: { id, name, email } }
```

### Post Endpoints

#### Get All Posts
```
GET /posts

Response: [
  {
    _id: "...",
    title: "...",
    content: "...",
    author: { _id, name, email },
    createdAt: "...",
    updatedAt: "..."
  },
  ...
]
```

#### Get Single Post
```
GET /posts/:id

Response: { Post object }
```

#### Create Post (Protected)
```
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "Post content here..."
}

Response: { Created post object }
```

#### Update Post (Protected)
```
PUT /posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}

Response: { Updated post object }
```

#### Delete Post (Protected)
```
DELETE /posts/:id
Authorization: Bearer <token>

Response: { message: "Post deleted" }
```

## 💻 Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework (4.18.2)
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB (7.0.0)
- **JWT** - JSON Web Tokens (9.0.0)
- **Bcrypt** - Password hashing (2.4.3)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with gradients & animations
- **Vanilla JavaScript** - No frameworks needed!
- **Fetch API** - HTTP requests

### Development Tools
- **Nodemon** - Auto-restart on file changes
- **Python** - HTTP server for frontend

## 📖 Learning Outcomes

This project covers Week 3 topics:

### ✅ Backend with Node.js/Express
- REST API design principles
- Request/response handling
- Middleware implementation
- Error handling
- Server setup and routing

### ✅ Database Design (MongoDB)
- Schema definition with Mongoose
- Data relationships (author-post)
- Data validation
- Indexing for performance
- Document population

### ✅ Authentication & Security
- JWT token generation and verification
- Password hashing with bcrypt
- Protected routes with middleware
- Secure token handling in localStorage

### ✅ Frontend Integration
- API consumption with Fetch
- State management with localStorage
- Form handling and validation
- Dynamic DOM manipulation
- Real-time updates with polling

## 🔧 Configuration

### Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Default Ports
- **Frontend:** 3000 (Python HTTP Server)
- **Backend:** 5000 (Express.js)
- **Database:** 27017 (MongoDB)

## 📊 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

### Post Schema
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: User, required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: MongooseError: Cannot connect to MongoDB
```
**Solution:** Ensure MongoDB service is running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
Frontend is configured to connect to `http://localhost:5000`. Ensure backend is running on port 5000.

### Token Expiration
If you see "Invalid token" errors, your JWT has expired. Simply log in again to get a new token.

## 📈 Future Enhancements

- [ ] Comments on posts
- [ ] Post categories/tags
- [ ] Search functionality
- [ ] User profile pages
- [ ] Email notifications
- [ ] Rate limiting
- [ ] Post image uploads
- [ ] Social sharing
- [ ] Analytics dashboard
- [ ] Dark mode theme

## 📝 File Descriptions

### Core Files
- **index.html** - Main application file with all UI, styling, and logic
- **server.js** - Express server initialization and routing setup
- **seed.js** - Database population script with sample data

### Models
- **User.js** - User authentication model with password hashing
- **Post.js** - Blog post model with author references

### Routes
- **auth.js** - Register and login endpoints
- **posts.js** - Full CRUD operations for blog posts

### Middleware
- **auth.js** - JWT verification for protected routes

## 🎓 Key Concepts Demonstrated

1. **RESTful API Design** - Proper HTTP methods and status codes
2. **Authentication** - JWT tokens and secure password storage
3. **Database Design** - Schema relationships and validation
4. **Error Handling** - Comprehensive try-catch blocks
5. **Security** - Password hashing, token verification, CORS
6. **UI/UX** - Modern responsive design with animations
7. **Code Organization** - Separated concerns (models, routes, middleware)

## 🤝 Contributing

This is an educational project. Feel free to fork, modify, and learn from it!

## 📄 License

MIT License - Free to use for learning and development.

## 🙌 Credits

Built as part of Week 3: Advanced Features bootcamp
- Created: January 2026
- Total Sample Posts: 11
- Total Demo Accounts: 4
- Lines of Code: 1500+

## 📞 Support

For issues or questions:
1. Check the QUICKSTART.md for common issues
2. Verify all services are running on correct ports
3. Check browser console for error messages
4. Ensure MongoDB is connected

---

**Ready to code?** Start with `START.bat` or follow the Quick Start guide above! 🚀
