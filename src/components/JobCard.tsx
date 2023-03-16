import { Box, Button, Heading, HStack, List, ListIcon, ListItem, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IJob } from '../types/types'
import { colorSchemes, locationTypeOptions, sectorOptions, workTypeOptions } from '../util/jobPropertyOptions';
import { renderTag } from '../util/tags';

interface JobCardProps {
    job: IJob;
}

const JobCard = ({
    job,
}: JobCardProps) => {
  const renderProperty = (label: string, value?: string, asTag: boolean = false, options: string[] = []) => {
    const indexofValue = options.indexOf(value || '');
    const colorScheme = indexofValue > -1 ? colorSchemes[indexofValue] : 'gray';
    return (
      <Box mb={3}>
        <Text color="gray.600" fontSize="sm">{label}</Text>
        { asTag ? renderTag(value || 'N/A', 'md', colorScheme) : <Text fontSize="lg">{value || 'N/A'}</Text> }        
      </Box>
    )
  }

     return (
        <Box boxShadow="md" border="1px" borderColor="gray.200" borderRadius={6} p={6} height="100%" bgColor="white">
          <Box mb={3}>
              <Heading fontSize="2xl">{job.jobTitle}</Heading>
          </Box>
          {renderProperty('Employer', job.employer)}
          {renderProperty('Work Type', job.workType, true, workTypeOptions)}
          {renderProperty('Sector', job.sector, true, sectorOptions)}
          {renderProperty('Location Type', job.locationType, true, locationTypeOptions)}
          {renderProperty('Location', job.location)}
        </Box>
  )
}
 
export default JobCard