import { Box, Heading, HStack, Input, List, Select, Spacer } from '@chakra-ui/react'
import React from 'react'
import { example } from '../mock_data/data';
import { IJob } from '../types/types'
import JobCard from './JobCard'

interface HomePageProps {

}

const HomePage =({

}: HomePageProps) => {
  return (
    <Box>
        <Box marginBottom={'4'}>
            <List spacing={'10'}>
                <HStack>
                    
                    <Box>
                        <Heading>Search</Heading>
                        <Input />
                    </Box>
                    <Spacer />
                    <Box>
                        <Heading>Location</Heading>
                        <Input />
                    </Box>
                    <Spacer />
                    <Box>
                        <Heading>Work Type</Heading>
                        <Select placeholder='Select'>
                            <option value='FullTime'>FullTime</option>
                            <option value='PartTime'>PartTime</option>
                        </Select>
                    </Box>
                </HStack>
            </List>
        </Box>
        <JobCard 
        job={example} />
    </Box>
  )
}

export default HomePage