import api from '../config/api';
import { Post, ApiResponse, PaginationInfo } from '../types';

export interface CreatePostData {
  content: string;
  image?: string | null;
}

export interface PostsResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

export const postService = {
  async createPost(data: CreatePostData): Promise<ApiResponse<{ post: Post }>> {
    const formData = new FormData();
    formData.append('content', data.content);
    
    if (data.image) {
      const filename = data.image.split('/').pop() || 'photo.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: data.image,
        type: type,
        name: filename,
      } as any);
    }

    const response = await api.post<ApiResponse<{ post: Post }>>(
      '/posts',
      formData
    );
    return response.data;
  },

  async getPosts(page: number = 1, limit: number = 10): Promise<ApiResponse<PostsResponse>> {
    const response = await api.get<ApiResponse<PostsResponse>>('/posts', {
      params: { page, limit },
    });
    return response.data;
  },

  async getPost(id: string): Promise<ApiResponse<{ post: Post }>> {
    const response = await api.get<ApiResponse<{ post: Post }>>(`/posts/${id}`);
    return response.data;
  },

  async likePost(id: string): Promise<ApiResponse<{ liked: boolean; likesCount: number }>> {
    const response = await api.post<ApiResponse<{ liked: boolean; likesCount: number }>>(
      `/posts/${id}/like`
    );
    return response.data;
  },

  async deletePost(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/posts/${id}`);
    return response.data;
  },
};

