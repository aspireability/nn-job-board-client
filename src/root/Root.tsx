import * as React from 'react'
import {
    BrowserRouter as Router,
  } from "react-router-dom";
import App from "./App"
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import JobProvider from '../store/JobStore';


const Root = () => (
    <ChakraProvider>
        <JobProvider>
            <Router>
                <App />
            </Router>
        </JobProvider>
    </ChakraProvider>
  )
  
export default Root;