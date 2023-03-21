import * as React from 'react'
import {
    HashRouter as Router,
} from "react-router-dom";
import App from "./App"
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import JobProvider from '../store/JobStore';
import theme from '..//styles/theme';


const Root = () => (
    <ChakraProvider theme={theme}>
        <JobProvider>
            <Router>
                <App />
            </Router>
        </JobProvider>
    </ChakraProvider>
  )
  
export default Root;