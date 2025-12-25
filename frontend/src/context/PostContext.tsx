import React, { createContext, useState, useContext } from 'react';
import { Post, PaginationInfo } from '../types';
import { postService } from '../services/postService';

interface PostContextType {
  posts: Post[];
  loading: boolean;
  pagination: PaginationInfo | null;
  fetchPosts: (page?: number, refresh?: boolean) => Promise<void>;
  createPost: (content: string, image?: string | null) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const fetchPosts = async (page: number = 1, refresh: boolean = false) => {
    try {
      setLoading(true);
      const response = await postService.getPosts(page, 10);
      
      if (response.success) {
        if (refresh || page === 1) {
          setPosts(response.data.posts);
        } else {
          setPosts((prev) => [...prev, ...response.data.posts]);
        }
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, image?: string | null) => {
    try {
      const response = await postService.createPost({ content, image });
      if (response.success) {
        setPosts((prev) => [response.data.post, ...prev]);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const likePost = async (postId: string) => {
    try {
      const response = await postService.likePost(postId);
      if (response.success) {
        const postResponse = await postService.getPost(postId);
        if (postResponse.success) {
          setPosts((prev) =>
            prev.map((post) =>
              post._id === postId ? postResponse.data.post : post
            )
          );
        }
      }
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  const refreshPosts = async () => {
    await fetchPosts(1, true);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        pagination,
        fetchPosts,
        createPost,
        likePost,
        deletePost,
        refreshPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

