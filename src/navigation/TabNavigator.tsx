import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import type { IoniconName } from '../components/ui/IconBadge';
import type { RootTabParamList } from './types';
import HomeScreen from '../screens/home/HomeScreen';
import AboutScreen from '../screens/about/AboutScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import ExpertiseScreen from '../screens/expertise/ExpertiseScreen';
import ContactScreen from '../screens/contact/ContactScreen';

type TabConfig = { icon: IoniconName; label: string };

const TAB_CONFIG: Record<keyof RootTabParamList, TabConfig> = {
  Home: { icon: 'home-outline', label: 'Home' },
  About: { icon: 'information-circle-outline', label: 'About' },
  Services: { icon: 'layers-outline', label: 'Services' },
  Expertise: { icon: 'ribbon-outline', label: 'Expertise' },
  Contact: { icon: 'mail-outline', label: 'Contact' },
};

const INDICATOR_SIZE = 40;

function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.barOuter, { paddingBottom: insets.bottom + theme.spacing.sm }]}>
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name as keyof RootTabParamList];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch(TabActions.jumpTo(route.name));
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityLabel={config.label}
              accessibilityState={{ selected: isFocused }}
            >
              {isFocused ? (
                <View style={styles.activeIndicator}>
                  <Ionicons name={config.icon} size={22} color={theme.colors.amber} />
                </View>
              ) : (
                <Ionicons name={config.icon} size={22} color={theme.colors.navInactive} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <AppTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Expertise" component={ExpertiseScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barOuter: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    elevation: 4,
    shadowColor: theme.colors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  activeIndicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    backgroundColor: theme.colors.amberTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
