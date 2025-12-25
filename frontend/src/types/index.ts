export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  bio: string;
  createdAt?: string;
  postCount?: number;
}

export interface Post {
  _id: string;
  author: User;
  content: string;
  image: string | null;
  likes: User[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasMore: boolean;
}

