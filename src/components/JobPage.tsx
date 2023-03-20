import { Box, Button, Heading, HStack, Text, Image, Link, SimpleGrid } from '@chakra-ui/react'
import { BsDash } from 'react-icons/bs'
import React from 'react'
import { IJob } from '../types/types'


interface JobPageProps {
    job: IJob;
}

const JobPage = ({
    job
}: JobPageProps) => {

var jobHasClassification = job.classification !== '' && job.classification !== undefined;
const renderProperty = (label: string, value?: string) => {
  return (
    <Box mb={3}>
      <Text color="gray.600" fontSize="md">{label}</Text>
      <Text fontSize="lg">{value || 'N/A'}</Text>
    </Box>
  )
}

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 1 }}>
        <Heading mb={{ base: 2, md: 5 }}>{job.jobTitle}</Heading>
        <Box mb={3}>
          <Text color="gray.600" fontSize="md">Description Document (Click to expand)</Text>
          <Link href={job.jobDescriptionUpload}>
            <Box height="100%">
              <Image src={job.jobDescriptionUploadThumbnail} alt={job.jobTitle} />
            </Box>                            
          </Link>
        </Box>
        {renderProperty('Location Type', job.locationType)}
        {renderProperty('Location', job.location)}
        {renderProperty('Work Type', job.workType)}
        {renderProperty('Application Instructions', job.applicationIn)}
        {renderProperty('Job Description', job.jobDescription)}
        {renderProperty('Employer', job.employer)}
        {renderProperty('Pay Range', job.payRange)}
        {renderProperty('Benefits', job.benefits)}
        <Box>
            <HStack spacing={9}>
                {renderProperty('Start Date', job.startingDate)}
                {renderProperty('Closing Date', job.closingDate)}
            </HStack>
        </Box>
        <Box>
            <HStack spacing={9}>
                {renderProperty('Navajo Preference?', job.navajoPreference)}
                {renderProperty('Veteran Preference', job.veteranPreference)}
            </HStack>
        </Box>
        {renderProperty('Required Documents', job.requiredDocuments)}
        {jobHasClassification && renderProperty('Classification', job.classification)}
        {renderProperty('Preferred Educational/Experience', job.preferredEdExp)}
        {renderProperty('Additonal Requirements', job.additionalReq)}
        <Box mb={3}>
          <Button as={Link} href={job.applicationLink} isExternal colorScheme='blue' variant={'solid'} width={{ base: '100%', md: 'md' }}>Apply Now</Button>
        </Box>
      </SimpleGrid>
    </Box>
  )
  
}

export default JobPage