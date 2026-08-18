import { Image } from 'react-native';

export interface LogoProps {
  size?: number;
}

// PNG aspect ratio: ~1.78 (16:9 landscape)
const ASPECT = 1.78;

export default function Logo({ size = 40 }: LogoProps) {
  const h = size;
  const w = Math.round(size * ASPECT);

  return (
    <Image
      source={require('../../../assets/logo.png')}
      style={{ width: w, height: h }}
      resizeMode="contain"
      accessibilityLabel="KySam Ventures logo"
    />
  );
}
