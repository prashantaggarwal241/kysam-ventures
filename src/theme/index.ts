import { colors } from './colors';
import { typography } from './typography';
import { spacing, maxContentWidth } from './spacing';
import { radius } from './radius';

export const theme = { colors, typography, spacing, radius } as const;

export { colors, typography, spacing, radius, maxContentWidth };
export type Theme = typeof theme;
