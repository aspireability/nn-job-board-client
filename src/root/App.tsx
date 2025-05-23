import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/700.css'

import { Route, Routes, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from '../containers/Home';
import Jobs from '../containers/Jobs';
import Job from '../containers/Job';
import { FiMenu } from 'react-icons/fi'
import { Box, Center, Flex, Heading, Spacer, Link, IconButton, HStack, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { Link as NavLink } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useEffect } from 'react'

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('ga page track', location.pathname);
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  const renderHeader = () => {
    return (
      <Flex
        px={{ base: 4, md: 10 }}
        py={{ base: 2, md: 4 }}
        borderBottom="1px solid"
        borderColor="blue.900"
        // boxShadow="md"
      >
        <HStack gap={[0, 3]}>
          <Image
            boxSize={{ base: '85%', md: '80%' }}
            src='./Replacement Logo.png'
            alt='Navajo Nation Seal'
            onClick={() => navigate('/')}
            cursor="pointer"
          />
          {/* <Heading fontSize={{ base: 'lg', md: '3xl' }}>Navajo Nation Job Board</Heading> */}
        </HStack>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<FiMenu />}
            variant="outline"
            size={['sm', 'md']}
          />
          <MenuList>
            <MenuItem as={NavLink} to="/">
              Home
            </MenuItem>
            <MenuItem as={NavLink} to="/jobs">
              Explore Jobs
            </MenuItem>            
          </MenuList>
        </Menu>
      </Flex>
    )
  }
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      {renderHeader()}
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
