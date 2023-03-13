import { Box, Button, Heading, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IJob } from '../types/types'

interface JobCardProps {
    job: IJob;
}

const JobCard = ({
    job,
}: JobCardProps) => {
     return (
        <Box boxShadow={'2xl'} p='6' rounded='md' bg='white' width={'sm'} height={'md'}>
            <Box>
                <Heading>{job.jobTitle}</Heading>
            </Box>
             <Box marginTop={'5'}>
                <List spacing={'3'}>
                    <Box >
                        <Text fontWeight={'semibold'}>EMPLOYER</Text>
                        {job.employer}
                    </Box>
                    <Box>
                        <Text fontWeight={'semibold'}>WORK TYPE</Text>
                        {job.workType}
                    </Box>
                    <Box>
                        <Text fontWeight={'semibold'}>SECTOR</Text>
                        {job.sector}
                    </Box>
                    <Box>
                        <Text fontWeight={'semibold'}>LOCATION TYPE</Text>
                        {job.locationType}
                    </Box>
                    <Box>
                        <Text fontWeight={'semibold'}   >LOCATION</Text>
                        {job.location}
                    </Box>
                </List>
            </Box>
        </Box>
  )
}
 
export default JobCard