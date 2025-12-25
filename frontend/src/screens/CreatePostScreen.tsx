import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { usePosts } from '../context/PostContext';
import { Button } from '../components';
import { theme } from '../utils/theme';

const CreatePostScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createPost } = usePosts();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please write something in your post');
      return;
    }

    try {
      setLoading(true);
      await createPost(content.trim(), image);
      setContent('');
      setImage(null);
      Alert.alert('Success', 'Post created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Feed') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + theme.spacing.md }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.label}>What's on your mind?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Share your thoughts..."
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={6}
            maxLength={1000}
            placeholderTextColor={theme.colors.textSecondary}
          />
          <Text style={styles.charCount}>
            {content.length}/1000 characters
          </Text>

          {image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={removeImage}
              >
                <Text style={styles.removeImageText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.imageButton}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            <Text style={styles.imageButtonText}>
              {image ? 'Change Image' : 'Add Image (Optional)'}
            </Text>
          </TouchableOpacity>

          <Button
            title="Post"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: theme.spacing.xs,
  },
  charCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'right',
    marginBottom: theme.spacing.md,
  },
  imageContainer: {
    marginBottom: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  removeImageButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.sm,
  },
  removeImageText: {
    color: theme.colors.danger,
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
  },
  imageButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  imageButtonText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: theme.spacing.md,
  },
});

export default CreatePostScreen;

