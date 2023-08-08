import { Box, Button, Center, Heading, Text, VStack, SimpleGrid, HStack, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { Icon } from '@chakra-ui/react';
import { MdOutlinePersonSearch, MdOutlineMap } from 'react-icons/md';
import { HiOutlineFilter, HiOutlineDatabase }  from 'react-icons/hi';
import { Helmet } from 'react-helmet';

const Home = () => {
    const path = '/jobs'

    const renderHero = () => {
      return (
        <Box
          backgroundImage="./banner-image.png"
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          height={{ base: "25%", md: "35%" }}
          px={{ base: 4, md: 12 }}
          py={{ base: 7, md: 12 }}          
        >
          <Box
            width={{ base: "100%", md: "75%", lg: "50%" }}
            backgroundColor={['rgba(255, 255, 255, .5)', 'rgba(255, 255, 255, .7)']}
            borderRadius={4}
            p={{ base: 2, md: 4 }}
          >
            <VStack
              gap={{ base: 1, md: 3 }}              
            >
              <Heading fontSize={{ base: '3xl', md: '7xl' }} fontWeight="bold">Kǫ́ǫ́ Naanish Hólǫ́</Heading>
              <Heading fontSize={{ base: '2xl', md: '5xl' }}>There ARE Jobs HERE</Heading>
              <Text textAlign="center" fontSize={{ base: 'md', md: 'xl' }}>Welcome to the Official Job Board of the Navajo Nation</Text>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={2} alignItems="end" >
              <Button as={Link} to={path} colorScheme="blue" size={{ base: 'md', md: 'lg'}} >Explore Jobs</Button>
              <Button colorScheme="red" size={{ base: 'md', md: 'lg'}}>For Employers</Button>
              </SimpleGrid>
             
            </VStack>
          </Box>
        </Box>
      )
    }

    const renderFeatureSection = (icon: any, title: string, description: string) => {
      return (
        <Box>
          <Box><Icon boxSize={{ base: 8, md: 12 }} as={icon} /></Box>
          <Heading fontSize={{ base: 'xl', md: '3xl' }} mb={2}>{title}</Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }}>{description}</Text>
        </Box>
      )
    }

    const renderFeatures = () => {
      return (
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          px={{ base: 4, md: 12 }}
          py={{ base: 10, md: 16 }}
          spacing={{ base: 10, md: 12 }}
          textAlign="center"       
        >
          {renderFeatureSection(MdOutlinePersonSearch, 'Curated For Navajos', 'A collection of job openings built specifically for the people of the great Navajo Nation.')}
          {renderFeatureSection(MdOutlineMap, 'In The Navajo Nation', 'Employment opportunities for Navajos inside the Navajo Nation.')}
          {renderFeatureSection(HiOutlineDatabase, 'All In One Place', 'A comprehensive collection of all Government and Private job listings available in the Navajo Nation')}
        </SimpleGrid>
      )
    }

    const renderDisclaimer = () => {
      return (
        <Box
          px={{ base: 4, md: 12 }}
          py={{ base: 7, md: 6 }}
          textAlign="center"
        >
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={2} color="gray.600" fontWeight="bold">DISCLAIMER ON ACCURACY AND COMPLETENESS OF INFORMATION</Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>While we use reasonable efforts to provide accurate and up-to-date information, some of the information provided is gathered or provided by third parties. We have not independently verified it. In addition, the information contained on this site has been compiled from a variety of sources and is subject to change without notice. Data can also quickly become out of date. By using this site, you agree that we will not be held liable for any errors or omissions contained in the information provided. Although the information found on this site has been produced and processed from sources believed to be reliable, no warranty, express or implied, is made regarding the accuracy, adequacy, completeness, legality, reliability, or usefulness of any information. We provide this information on an “as is” basis and expressly disclaim any and all warranties, express and implied, with respect thereto. This disclaimer applies to both isolated and aggregate uses of information.</Text>
        </Box>
      )
    }

    return (
      <Box        
      >
        <Helmet>
          <title>Navajo Nation Job Board - Home</title>
        </Helmet>
        {renderHero()}
          <Box
            px={{ base: 4, md: "30%" }}
            pt={{ base: 7, md: 12 }}
            textAlign="center"
          >
            {renderFeatureSection(HiOutlineFilter, 'Getting Started', 'Click on Explore Jobs button above to see all available jobs. Then use the search and filter options at the top to narrow down the list to your desired criteria.')}
          </Box>
        {renderFeatures()}        
        {renderDisclaimer()}        
      </Box>
      )
}

export default Home