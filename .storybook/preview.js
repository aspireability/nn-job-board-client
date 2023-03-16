import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'

import theme from '../src/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // chakra: {
  //   theme,
  // },
};

const withChakra = (StoryFn) => {
  console.log('theme', theme);
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <StoryFn />
        </Router>        
      </ChakraProvider>
    </>    
  )
}
export const decorators = [withChakra];

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }