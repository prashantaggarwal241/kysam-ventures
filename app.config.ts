import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'KySam Ventures',
  slug: 'kysam-ventures',
  version: '1.0.0',
  web: {
    bundler: 'metro',
    output: 'single',
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  },
});
