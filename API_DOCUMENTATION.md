# MicroSocial API Documentation

Complete API reference for MicroSocial backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- username: 3-30 characters, unique
- email: valid email format, unique
- password: minimum 6 characters

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "avatar": null,
      "bio": ""
    }
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

---

### Login

Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "avatar": null,
      "bio": ""
    }
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User

Get authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "avatar": null,
      "bio": "",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Post Endpoints

### Create Post

Create a new post with optional image.

**Endpoint:** `POST /posts`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `content` (string, required): Post text content (max 1000 characters)
- `image` (file, optional): Image file (jpeg, jpg, png, gif, webp, max 5MB)

**Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "author": {
        "id": "507f1f77bcf86cd799439011",
        "username": "johndoe",
        "avatar": null
      },
      "content": "My first post!",
      "image": "/uploads/image-1234567890.jpg",
      "likes": [],
      "comments": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### Get Feed (Paginated)

Get paginated list of all posts (feed).

**Endpoint:** `GET /posts`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Posts per page (default: 10)

**Example:** `GET /posts?page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "author": {
          "id": "507f1f77bcf86cd799439011",
          "username": "johndoe",
          "avatar": null
        },
        "content": "My first post!",
        "image": "/uploads/image-1234567890.jpg",
        "likes": [
          {
            "id": "507f1f77bcf86cd799439013",
            "username": "janedoe",
            "avatar": null
          }
        ],
        "comments": [],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 50,
      "hasMore": true
    }
  }
}
```

---

### Get Single Post

Get details of a specific post.

**Endpoint:** `GET /posts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "author": {
        "id": "507f1f77bcf86cd799439011",
        "username": "johndoe",
        "avatar": null,
        "bio": "My bio"
      },
      "content": "My first post!",
      "image": "/uploads/image-1234567890.jpg",
      "likes": [],
      "comments": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Post not found"
}
```

---

### Update Post

Update a post (author only).

**Endpoint:** `PUT /posts/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `content` (string, optional): Updated post content
- `image` (file, optional): New image file

**Response (200):**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "post": {
      "_id": "507f1f77bcf86cd799439012",
      "author": {
        "id": "507f1f77bcf86cd799439011",
        "username": "johndoe",
        "avatar": null
      },
      "content": "Updated content",
      "image": "/uploads/image-1234567890.jpg",
      "likes": [],
      "comments": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T01:00:00.000Z"
    }
  }
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this post"
}
```

---

### Delete Post

Delete a post (author only).

**Endpoint:** `DELETE /posts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "Not authorized to delete this post"
}
```

---

### Like/Unlike Post

Toggle like on a post.

**Endpoint:** `POST /posts/:id/like`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Post liked",
  "data": {
    "liked": true,
    "likesCount": 5
  }
}
```

---

## User Endpoints

### Get User Profile

Get user profile information.

**Endpoint:** `GET /users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "avatar": null,
      "bio": "My bio",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "postCount": 10
    }
  }
}
```

---

### Get User Posts

Get paginated list of posts by a specific user.

**Endpoint:** `GET /users/:id/posts`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Posts per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "author": {
          "id": "507f1f77bcf86cd799439011",
          "username": "johndoe",
          "avatar": null
        },
        "content": "My first post!",
        "image": null,
        "likes": [],
        "comments": [],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalPosts": 10,
      "hasMore": true
    }
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // Optional: validation errors
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `500` - Internal Server Error

---

## Image URLs

Uploaded images are served at:
```
http://localhost:5000/uploads/<filename>
```

Example:
```
http://localhost:5000/uploads/image-1234567890.jpg
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production.

## CORS

CORS is enabled for all origins. Configure appropriately for production.

