import { registerRootComponent } from 'expo';
import { ActivityIndicator, View } from 'react-native';
import {
  useFonts,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
} from '@expo-google-fonts/ibm-plex-sans';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import SrcApp from './src/root/App';

function App() {
  const [fontsLoaded, fontError] = useFonts({
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A2340', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  return <SrcApp />;
}

registerRootComponent(App);
export default App;
