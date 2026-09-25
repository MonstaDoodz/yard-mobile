export const colors = {
  light: '#e8e8e8',
  dark: '#171717',
  purple: '#6a5cff',
  gold: '#e8c15b',
  success: '#1bce81',
  destructive: '#dc2626',
  info: '#0095f6',
  white: '#ffffff',
  inkMuted: '#66666b',
  inkSoft: '#939398',
  darkRaised: '#242427',
  darkMuted: '#ababaf',
  line: '#d7d7d9',
  field: '#f7f7f7',
} as const;

export const typography = {
  family: {
    regular: 'Geist_400Regular',
    medium: 'Geist_500Medium',
    semibold: 'Geist_600SemiBold',
    bold: 'Geist_700Bold',
    mono: 'JetBrainsMono_500Medium',
  },
  size: {
    micro: 10,
    caption: 12,
    body: 15,
    title: 30,
    display: 38,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 40,
} as const;

export const radii = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  pill: 999,
} as const;

export const surfaces = {
  canvas: colors.light,
  card: colors.field,
  inverse: colors.dark,
  inverseRaised: colors.darkRaised,
  tabBar: colors.dark,
} as const;
