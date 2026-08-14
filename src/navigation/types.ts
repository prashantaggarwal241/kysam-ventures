export type RouteKey = 'Home' | 'About' | 'Services' | 'Expertise' | 'Contact';

export interface ScreenProps {
  navigate: (route: RouteKey) => void;
}

/** Kept for any residual React Navigation types if needed in future phases. */
export type RootTabParamList = {
  Home: undefined;
  About: undefined;
  Services: undefined;
  Expertise: undefined;
  Contact: undefined;
};
