import { Box, Button, Image, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom";

const Home = () => {
    const path = '/jobs'

    return (
      <Box        
        py={{ base: 7, md: 20 }}
      >
        <SimpleGrid columns={{ base: 1, md: 2}} gap={{ base: 12, md: 5 }}>
          <VStack
            gap={{ base: 1, md: 3 }}
            px={{ base: 2, md: 12 }}
          >
            <Heading fontSize={{ base: '3xl', md: '7xl' }} fontWeight="bold">Kǫ́ǫ́ Naanish Hólǫ́</Heading>
            <Heading fontSize={{ base: '2xl', md: '5xl' }}>There ARE Jobs HERE</Heading>
            <Text textAlign="center" fontSize={{ base: 'md', md: 'xl' }}>Welcome to the Official Job Board of the Navajo Nation</Text>
            <Button as={Link} to={path} colorScheme="blue" size={{ base: 'md', md: 'lg'}}>Explore Jobs</Button>                
          </VStack>
          <Image
            boxSize={{ base: '100%', md: '100%' }}
            src='./banner-image.jpeg'
            alt='Navajo Nation Seal'            
            px={{ base: 3, md: 12 }}
          />
        </SimpleGrid>        
      </Box>
      )
}

export default Home