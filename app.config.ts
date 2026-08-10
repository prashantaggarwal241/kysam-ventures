import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'KySam Ventures',
  slug: 'kysam-ventures',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kysamventures.app',
  },
  android: {
    package: 'com.kysamventures.app',
    adaptiveIcon: {
      backgroundColor: '#0F2A4A',
    },
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  },
});
