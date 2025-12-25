# MicroSocial - Minimal Social Media App

A full-stack React Native social media application built with Expo, Node.js, Express, and MongoDB. This project demonstrates clean architecture, proper state management, and RESTful API design.

## 🎥 Demo Video


https://github.com/user-attachments/assets/3ec929ab-8861-4f27-b3ea-3cc4c07d6bff


## 📱 Features

### Core Features
- ✅ User Authentication (Register/Login with JWT)
- ✅ Create Posts (Text + Optional Image)
- ✅ View Feed (Latest posts with pagination)
- ✅ Like/Unlike Posts
- ✅ View Profile & Own Posts
- ✅ Delete Own Posts
- ✅ Image Upload for Posts

### Technical Features
- JWT-based authentication
- Context API for state management
- AsyncStorage for token persistence
- Image picker integration
- Pagination for feed
- Error handling and validation
- Clean, modern UI

## 🏗️ Project Structure

```
microsocial/
├── backend/          # Node.js + Express API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Auth & upload middleware
│   └── server.js     # Express server
│
└── frontend/         # React Native Expo app
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── screens/      # App screens
    │   ├── context/      # Context providers
    │   ├── services/     # API services
    │   ├── navigation/   # Navigation setup
    │   └── utils/        # Utilities & theme
    └── App.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator / Physical Device

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/microsocial
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

5. Start MongoDB (if running locally):
```bash
# macOS/Linux
mongod

# Windows - Start MongoDB service
```

6. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/config/api.ts`:
   - For Android Emulator: Use `http://10.0.2.2:5000/api`
   - For iOS Simulator: Use `http://localhost:5000/api`
   - For Physical Device: Use `http://YOUR_COMPUTER_IP:5000/api`

4. Start Expo:
```bash
npm start
```

5. Scan QR code with Expo Go app or press:
   - `i` for iOS simulator
   - `a` for Android emulator

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com",
      "avatar": null,
      "bio": ""
    }
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

### Post Endpoints

#### Create Post
```http
POST /posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "content": "My first post!",
  "image": <file> (optional)
}
```

#### Get Feed (Paginated)
```http
GET /posts?page=1&limit=10
Authorization: Bearer {token}
```

#### Get Single Post
```http
GET /posts/:id
Authorization: Bearer {token}
```

#### Like/Unlike Post
```http
POST /posts/:id/like
Authorization: Bearer {token}
```

#### Delete Post
```http
DELETE /posts/:id
Authorization: Bearer {token}
```

### User Endpoints

#### Get User Profile
```http
GET /users/:id
Authorization: Bearer {token}
```

#### Get User Posts
```http
GET /users/:id/posts?page=1&limit=10
Authorization: Bearer {token}
```

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Create Post:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "content=Hello World" \
  -F "image=@/path/to/image.jpg"
```

## 📱 App Screens

1. **Login Screen** - User authentication
2. **Register Screen** - New user registration
3. **Feed Screen** - View all posts with pagination
4. **Create Post Screen** - Create new posts with optional images
5. **Profile Screen** - View own profile and posts
6. **Post Detail Screen** - View individual post details

## 🛠️ Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- React Navigation (Stack & Tabs)
- Context API (State Management)
- AsyncStorage
- Expo Image Picker
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcrypt (Password hashing)
- Multer (File uploads)
- Express Validator

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/microsocial
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

### Frontend
Update `src/config/api.ts` with your backend URL.

## 🎨 UI/UX Features

- Clean, modern design
- Responsive layouts
- Loading states
- Error handling
- Pull-to-refresh
- Infinite scroll pagination
- Image preview
- Avatar placeholders

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- File type validation
- File size limits

## 📦 Dependencies

See `package.json` files in both `backend/` and `frontend/` directories.

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string in `.env`
- For MongoDB Atlas, update connection string

**Port Already in Use:**
- Change PORT in `.env`
- Or kill process using port 5000

### Frontend Issues

**Cannot Connect to API:**
- Check API URL in `src/config/api.ts`
- For physical device, use computer's IP address
- Ensure backend is running
- Check firewall settings

**Image Upload Not Working:**
- Check file permissions
- Verify uploads directory exists
- Check file size limits

## 📄 License

This project is created for educational purposes.

## 👤 Author

Built as a Full-Stack React Native Assignment

---

**Note:** This is a minimal social media app focusing on clean architecture and core functionality. Additional features like comments, followers, and messaging can be added as extensions.

