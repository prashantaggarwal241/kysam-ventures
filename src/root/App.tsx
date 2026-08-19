import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './RootNavigator';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        * { scrollbar-width: none; -ms-overflow-style: none; box-sizing: border-box; }
        *::-webkit-scrollbar { display: none; }
        html, body { overflow-x: hidden; max-width: 100vw; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
