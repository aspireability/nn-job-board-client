import { Box, Button, Center, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom";

const Home = () => {
    const path = '/jobs'

    return (
        <Box>
            <SimpleGrid column={{base: 1, md: 1}} py={{ base: 2, md: 4 }} alignItems={'end'}>
            <Center>
                <VStack>
                    <Box px={{ base: 10, md: 10 }}>
                        <Heading size="2xl" mb={4} textShadow='1px 1px'>Welecome to the Navajo Nation's Job Board</Heading>
                    </Box>
                    <Button as={Link} to={path} colorScheme='orange' size={'lg'} height={'200'} >Click to See All the Jobs</Button>
                </VStack>
            </Center>
            </SimpleGrid>
        </Box>
      )
}

export default Home