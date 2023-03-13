import { Box, Button, Heading, HStack, List, ListIcon, ListItem, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IJob } from '../types/types'

interface JobCardProps {
    job: IJob;
}

const JobCard = ({
    job,
}: JobCardProps) => {
     return (
        <Box boxShadow={'2xl'} p='6' rounded='md' bg='white' width={'md'} height={'md'}>
            <Box>
                <Heading>{job.jobTitle}</Heading>
            </Box>
            <SimpleGrid columns={1} spacing={1}>
            <Box height='55px'>
                <Text fontWeight={'semibold'}>EMPLOYER</Text>
                {job.employer}
            </Box>
            <Box height='55px'>
                <Text fontWeight={'semibold'}>WORK TYPE</Text>
                {job.workType}
            </Box>
            <Box height='55px'>
                <Text fontWeight={'semibold'}>SECTOR</Text>
                {job.sector}
            </Box>
            <Box height='55px'>
                <Text fontWeight={'semibold'}>LOCATION TYPE</Text>
                {job.locationType}
            </Box>
            <Box height='55px'>
                <Text fontWeight={'semibold'}>LOCATION</Text>
                {job.location}
            </Box>
            </SimpleGrid>
        </Box>
  )
}
 
export default JobCard