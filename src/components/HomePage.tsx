import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { example } from '../mock_data/data';
import { IJob } from '../types/types'
import JobCard from './JobCard'

interface HomePageProps {
    job: IJob
}

const HomePage =({
    job
}: HomePageProps) => {
  return (
  
    <Box  marginTop={'4'}>
        <SimpleGrid columns={3} spacing={3}>
            <Box>
                <JobCard job={job} />
            </Box>
        </SimpleGrid>
    </Box>
  )
}

export default HomePage