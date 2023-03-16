import { Box, Button, Heading, HStack, List, ListIcon, ListItem, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IJob } from '../types/types'

interface JobCardProps {
    job: IJob;
}

const JobCard = ({
    job,
}: JobCardProps) => {
  const renderProperty = (label: string, value?: string) => {
    return (
      <Box mb={3}>
        <Text color="gray.600" fontSize="sm">{label}</Text>
        <Text fontSize="lg">{value || 'N/A'}</Text>
      </Box>
    )
  }

     return (
        <Box boxShadow="md" border="1px" borderColor="gray.200" borderRadius={6} p={6} height="100%">
          <Box mb={3}>
              <Heading fontSize="2xl">{job.jobTitle}</Heading>
          </Box>
          {renderProperty('Employer', job.employer)}
          {renderProperty('Work Type', job.workType)}
          {renderProperty('Sector', job.sector)}
          {renderProperty('Location Type', job.locationType)}
          {renderProperty('Location', job.location)}
        </Box>
  )
}
 
export default JobCard