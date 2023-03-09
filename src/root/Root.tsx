import * as React from 'react'

import App from "./App"
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


const Root = () => (
    <ChakraProvider>
          <App />
    </ChakraProvider>
  )
  
export default Root;