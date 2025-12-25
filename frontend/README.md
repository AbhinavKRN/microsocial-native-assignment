# MicroSocial Frontend

React Native mobile application built with Expo for the MicroSocial platform.

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Update API URL in `src/config/api.ts`:
   - Android Emulator: `http://10.0.2.2:5000/api`
   - iOS Simulator: `http://localhost:5000/api`
   - Physical Device: `http://YOUR_IP:5000/api`

3. Start Expo:
```bash
npm start
```

4. Scan QR code with Expo Go app or use simulator

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PostCard.tsx
│   │   └── Loading.tsx
│   ├── screens/         # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── FeedScreen.tsx
│   │   ├── CreatePostScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── PostDetailScreen.tsx
│   ├── context/         # Context providers
│   │   ├── AuthContext.tsx
│   │   └── PostContext.tsx
│   ├── services/        # API service layer
│   │   ├── authService.ts
│   │   ├── postService.ts
│   │   └── userService.ts
│   ├── navigation/      # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── config/          # Configuration
│   │   └── api.ts       # Axios instance
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── utils/           # Utilities
│       └── theme.ts     # Theme configuration
├── App.tsx              # Root component
└── package.json
```

## 🎨 Features

### Screens

1. **Login Screen**
   - Email/password authentication
   - Navigation to register

2. **Register Screen**
   - Username, email, password
   - Form validation

3. **Feed Screen**
   - List of all posts
   - Pull-to-refresh
   - Infinite scroll pagination
   - Like functionality

4. **Create Post Screen**
   - Text input (max 1000 chars)
   - Optional image picker
   - Character counter

5. **Profile Screen**
   - User information
   - Post count
   - List of user's posts
   - Logout functionality

6. **Post Detail Screen**
   - Full post view
   - Like/unlike
   - Delete (author only)

### State Management

- **AuthContext**: Manages authentication state
  - User data
  - Token
  - Login/Register/Logout functions

- **PostContext**: Manages posts state
  - Posts list
  - Pagination
  - CRUD operations
  - Like functionality

### Navigation

- Stack Navigator for auth/main flow
- Bottom Tab Navigator for main app
- Protected routes based on auth state

## 🔧 Configuration

### API Configuration

Edit `src/config/api.ts`:

```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api'
  : 'https://your-production-api.com/api';
```

### Theme

Customize colors, spacing, and typography in `src/utils/theme.ts`

## 📦 Key Dependencies

- expo - Expo framework
- @react-navigation/native - Navigation
- @react-navigation/stack - Stack navigator
- @react-navigation/bottom-tabs - Tab navigator
- @react-native-async-storage/async-storage - Local storage
- expo-image-picker - Image selection
- axios - HTTP client

## 🎯 Usage Examples

### Using Auth Context

```typescript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use auth state and functions
};
```

### Using Post Context

```typescript
import { usePosts } from '../context/PostContext';

const MyComponent = () => {
  const { posts, loading, createPost, likePost } = usePosts();
  
  // Use post state and functions
};
```

## 🐛 Troubleshooting

### Cannot Connect to API

1. Check API URL in `src/config/api.ts`
2. Ensure backend is running
3. For physical device, use computer's IP address
4. Check firewall settings

### Image Picker Not Working

1. Check permissions in `app.json`
2. Ensure expo-image-picker is installed
3. Check device permissions

### Navigation Issues

1. Ensure all screens are registered in navigator
2. Check route names match
3. Verify navigation props

## 📱 Building for Production

```bash
# iOS
expo build:ios

# Android
expo build:android
```

## 🎨 Customization

### Theme Colors

Edit `src/utils/theme.ts` to customize:
- Primary colors
- Background colors
- Text colors
- Spacing
- Border radius
- Font sizes

### Components

All components are in `src/components/` and can be customized as needed.

