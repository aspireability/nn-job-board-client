import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { example } from '../mock_data/data';
import { Link } from 'react-router-dom';
import { IJob } from '../types/types'
import JobCard from './JobCard'

interface HomePageProps {
    jobs: IJob[],
    onJobClick: (jobId: string) => void
}

const HomePage =({
    jobs,
    onJobClick
}: HomePageProps) => {
  if (jobs.length === 0) {
    return <Text fontSize="xl">No jobs found matching your search.</Text>
  }

  return (  
    <Box>
      <SimpleGrid minChildWidth="300px" gap={{ base: 5, md: 10 }}>
        {jobs.map(job => {          
          return (
            <Box onClick={() => onJobClick(job.id)} cursor="pointer">
              <JobCard job={job} />
            </Box>            
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export default HomePage