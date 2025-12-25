import Constants from 'expo-constants';

const getBaseUrl = () => {
  const apiUrl = Constants.expoConfig?.extra?.apiBaseUrl || 
    process.env.EXPO_PUBLIC_API_BASE_URL || 
    'http://localhost:5000/api';
  
  return apiUrl.replace(/\/api$/, '');
};

export const getImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = getBaseUrl();
  return `${baseUrl}${imagePath}`;
};

