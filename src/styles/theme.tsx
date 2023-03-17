import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const overrides = {
  fonts: {
    heading: `'Manrope', sans-serif`,
    body: `'Inter', sans-serif`,
    cursive: `'Tangerine', cursive`,
  },
  // colors: {
  //   primary: { 500: '#774360' },
  //   secondary: { 100: '#B25068', 500: '#B25068', 900: '#B25068' },
  //   tertiary: '#D4F6CC',
  // },
}

const theme = extendTheme(
  overrides,
  // withDefaultColorScheme({ colorScheme: 'primary' })
)

console.log('theme', theme);

export default theme;