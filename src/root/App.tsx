import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'

import React from 'react';
import logo from './logo.svg';

import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from '../containers/Home';
import Jobs from '../containers/Jobs';
import Job from '../containers/Job';
import { Box, Center, Flex, Heading, HStack, Link, Spacer, Image, Text, VStack } from '@chakra-ui/react'

const App = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <HStack
        px={{ base: 4, md: 10 }}
        py={{ base: 2, md: 4 }}
        gap={2}
        borderBottom="1px solid"
        borderColor="blue.900"
        // boxShadow="md"
      >
        <Image
          boxSize={{ base: '40px', md: '75px' }}
          src='./navajoSeal_SiteLogo_only.png'
          alt='Navajo Nation Seal'
          onClick={() => navigate('/')}
          cursor="pointer"
        />
        <Heading fontSize={{ base: 'lg', md: '3xl' }}>Navajo Nation Job Board</Heading>
      </HStack>      
      <Box flexGrow="1" display="flex" flexDirection="column" overflow="auto">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:jobId" element={<Job />} />
        </Routes>
      </Box>
      <Center py={3} px={12} backgroundColor="gray.100">
        {/* <Text fontSize={{ base: "xs", md: "md" }} fontWeight="semibold">Navajo Nation Job Board</Text>
        <Spacer /> */}
        <Link href="https://aspireability.io" target={"_blank"} fontSize={{ base: "xs", md: "md" }} fontWeight="semibold"> © Aspire Ability Inc. 2023</Link>
      </Center>
    </Box>
  )
}

export default App;
