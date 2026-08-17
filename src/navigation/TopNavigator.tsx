import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SideNav from '../components/layout/SideNav';
import type { RouteKey } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import AboutScreen from '../screens/about/AboutScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import ExpertiseScreen from '../screens/expertise/ExpertiseScreen';
import ContactScreen from '../screens/contact/ContactScreen';

export default function TopNavigator() {
  const [activeRoute, setActiveRoute] = useState<RouteKey>('Home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigate = (route: RouteKey) => {
    setActiveRoute(route);
    setIsNavOpen(false);
  };

  const toggleNav = () => setIsNavOpen(prev => !prev);

  return (
    <View style={styles.container}>
      {/* Screen content — full width, full height */}
      <View style={styles.screen}>
        {activeRoute === 'Home'      && <HomeScreen navigate={navigate} />}
        {activeRoute === 'About'     && <AboutScreen navigate={navigate} />}
        {activeRoute === 'Services'  && <ServicesScreen navigate={navigate} />}
        {activeRoute === 'Expertise' && <ExpertiseScreen navigate={navigate} />}
        {activeRoute === 'Contact'   && <ContactScreen navigate={navigate} />}
      </View>

      {/* Sliding sidebar + toggle button (overlay) */}
      <SideNav
        activeRoute={activeRoute}
        isOpen={isNavOpen}
        onToggle={toggleNav}
        onNavigate={navigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  screen: {
    flex: 1,
  },
});
