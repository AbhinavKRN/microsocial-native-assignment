# MicroSocial Backend API

RESTful API built with Node.js, Express, and MongoDB for the MicroSocial application.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

4. Start MongoDB:
```bash
mongod
```

5. Run the server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js      # User model
│   └── Post.js      # Post model
├── routes/
│   ├── auth.js      # Authentication routes
│   ├── posts.js     # Post CRUD routes
│   └── users.js     # User profile routes
├── middleware/
│   ├── auth.js      # JWT authentication middleware
│   └── upload.js    # File upload middleware (Multer)
├── uploads/         # Uploaded images (created automatically)
├── server.js         # Express server setup
└── package.json
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Posts

- `POST /api/posts` - Create post (Protected)
- `GET /api/posts` - Get feed with pagination (Protected)
- `GET /api/posts/:id` - Get single post (Protected)
- `PUT /api/posts/:id` - Update post (Protected, Author only)
- `DELETE /api/posts/:id` - Delete post (Protected, Author only)
- `POST /api/posts/:id/like` - Like/Unlike post (Protected)

### Users

- `GET /api/users/:id` - Get user profile (Protected)
- `GET /api/users/:id/posts` - Get user's posts (Protected)

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Request/Response Examples

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Post with Image
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

content: "My post content"
image: <file>
```

### Get Feed
```http
GET /api/posts?page=1&limit=10
Authorization: Bearer <token>
```

## 🗄️ Database Models

### User
- username (String, unique, required)
- email (String, unique, required)
- password (String, hashed, required)
- avatar (String, optional)
- bio (String, optional)
- timestamps

### Post
- author (ObjectId, ref: User, required)
- content (String, required, max 1000 chars)
- image (String, optional)
- likes (Array of User ObjectIds)
- comments (Array of comment objects)
- timestamps

## 🔒 Security

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Input validation with express-validator
- File type validation (images only)
- File size limits (5MB default)

## 📦 Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- multer - File uploads
- express-validator - Input validation
- cors - CORS middleware
- dotenv - Environment variables

## 🐛 Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

## 📊 Response Format

Success responses:
```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

