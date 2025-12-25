import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePosts } from '../context/PostContext';
import { PostCard, Loading } from '../components';
import { theme } from '../utils/theme';
import { Post } from '../types';

const FeedScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { posts, loading, pagination, fetchPosts, refreshPosts } = usePosts();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts(1, true);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshPosts();
    setRefreshing(false);
  };

  const loadMore = () => {
    if (pagination && pagination.hasMore && !loading) {
      fetchPosts(pagination.currentPage + 1, false);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onPress={() => navigation.navigate('PostDetail', { postId: item._id })}
    />
  );

  if (loading && posts.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[styles.list, { paddingTop: insets.top }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share something!
            </Text>
          </View>
        }
        ListFooterComponent={
          loading && posts.length > 0 ? (
            <View style={styles.footer}>
              <Text style={styles.footerText}>Loading more posts...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    padding: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyText: {
    fontSize: theme.fontSize.xl,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
});

export default FeedScreen;

