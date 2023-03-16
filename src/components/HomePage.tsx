import { Box, SimpleGrid } from '@chakra-ui/react'
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
  return (
  
    <Box  marginTop={'4'}>
      <SimpleGrid columns={3} spacing={10}>
        {jobs.map(job => {          
          return (
            <Box onClick={() => onJobClick(job.id)}>
              <JobCard job={job} />
            </Box>            
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export default HomePage