import { Box, Heading, HStack, Input, List, Select, Spacer } from '@chakra-ui/react'
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
        
        <JobCard job={job} />
       
    </Box>
  )
}

export default HomePage