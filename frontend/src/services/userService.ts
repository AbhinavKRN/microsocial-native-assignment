import api from '../config/api';
import { User, Post, ApiResponse, PaginationInfo } from '../types';

export interface UserPostsResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export const userService = {
  async getUserProfile(userId: string): Promise<ApiResponse<{ user: User }>> {
    const response = await api.get<ApiResponse<{ user: User }>>(`/users/${userId}`);
    return response.data;
  },

  async getUserPosts(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<UserPostsResponse>> {
    const response = await api.get<ApiResponse<UserPostsResponse>>(
      `/users/${userId}/posts`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  },
};

