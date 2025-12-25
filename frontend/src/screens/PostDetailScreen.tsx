import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { postService } from '../services/postService';
import { Loading } from '../components';
import { theme } from '../utils/theme';
import { getImageUrl } from '../utils/imageUtils';
import { Post } from '../types';

const PostDetailScreen = ({ route, navigation }: any) => {
  const { postId } = route.params;
  const { user } = useAuth();
  const { likePost, deletePost } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPost(postId);
      if (response.success) {
        setPost(response.data.post);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load post');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await likePost(postId);
      await loadPost(); // Refresh post data
    } catch (error) {
      Alert.alert('Error', 'Failed to like post');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(postId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete post');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading || !post) {
    return <Loading />;
  }

  const isLiked = post.likes.some(
    (like) => typeof like === 'object' && like.id === user?.id
  );
  const isAuthor = post.author.id === user?.id;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <View style={styles.header}>
          <View style={styles.authorInfo}>
            {post.author.avatar ? (
              <Image
                source={{ uri: post.author.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {post.author.username.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.username}>{post.author.username}</Text>
              <Text style={styles.timestamp}>{formatDate(post.createdAt)}</Text>
            </View>
          </View>
          {isAuthor && (
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.content}>{post.content}</Text>

        {post.image && (
          <Image source={{ uri: getImageUrl(post.image) || '' }} style={styles.image} />
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Text style={[styles.likeText, isLiked && styles.likedText]}>
              {isLiked ? '❤️' : '🤍'} {post.likes.length} likes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  post: {
    backgroundColor: theme.colors.surface,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.sm,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
  },
  username: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  deleteText: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
  },
  content: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  likeButton: {
    paddingVertical: theme.spacing.xs,
  },
  likeText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  likedText: {
    color: theme.colors.danger,
  },
});

export default PostDetailScreen;

