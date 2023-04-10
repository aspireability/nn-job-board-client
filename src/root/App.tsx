import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'

import React from 'react';
import logo from './logo.svg';

import { Route, Routes } from 'react-router-dom';
import Home from '../containers/Home';
import Jobs from '../containers/Jobs';
import Job from '../containers/Job';
import { Box, Center, Flex, Heading, HStack, Link, Spacer, Stack, Text, VStack } from '@chakra-ui/react'

const App = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <Box backgroundColor="blue.900" py={2}>
        <Box backgroundColor="yellow.400" py={2} w="100%">
          <Center color="white" backgroundColor="red.800" py={2} w="100%">
            <VStack>
              <Heading fontSize={{ base: 'lg', md: '4xl' }}>Kǫ́ǫ́ Naanish Hólǫ́ - There ARE Jobs HERE</Heading>
              <Heading fontSize={{ base: 'md', md: '2xl' }}>Official Job Board of the Navajo Nation</Heading>
            </VStack>
          </Center>
        </Box>
      </Box>
      <Box flexGrow="1" display="flex" flexDirection="column" overflow="auto">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:jobId" element={<Job />} />
        </Routes>
      </Box>
      <Center py={3} px={12} backgroundColor="blue.900" color="white">
        {/* <Text fontSize={{ base: "xs", md: "md" }} fontWeight="semibold">Navajo Nation Job Board</Text>
        <Spacer /> */}
        <Text fontSize={{ base: "xs", md: "md" }} fontWeight="semibold" >Powered by <Link href="https://aspireability.io" target={"_blank"}>Aspire Ability Inc.</Link></Text>
      </Center>
    </Box>
  )
}

export default App;
