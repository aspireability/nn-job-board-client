import { Box, Button, Heading, HStack, Text, Image, Link, SimpleGrid } from '@chakra-ui/react'
import { BsDash } from 'react-icons/bs'
import React from 'react'
import { IJob } from '../types/types'
import { colorSchemes, locationTypeOptions, sectorOptions, workTypeOptions } from '../util/jobPropertyOptions';
import { renderTag } from '../util/tags';

interface JobPageProps {
    job: IJob;
}

const JobPage = ({
    job
}: JobPageProps) => {

  const renderLabel = (label: string) => {
    return (
      <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">{label}</Text>
    )
  }

  const renderProperty = (label: string, value?: string, asTag: boolean = false, options: string[] = []) => {
    const indexofValue = options.indexOf(value || '');
    const colorScheme = indexofValue > -1 ? colorSchemes[indexofValue] : 'gray';
    return (
      <Box mb={3}>
        {renderLabel(label)}
        { asTag ? renderTag(value || 'N/A', 'md', colorScheme) : <Text fontSize={{ base: 'ld', md: 'xl' }}>{value || 'N/A'}</Text> }        
      </Box>
    )
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 1 }}>
        <Heading mb={{ base: 2, md: 5 }}>{job.jobTitle}</Heading>
        {renderProperty('Job Description', job.jobDescription)}
        <Box mb={3}>
          {renderLabel('Job Description Document (Click to Expand)')}
          <Link href={job.jobDescriptionUpload}>
            <Image boxSize={{ base: '25px', md: '50px' }} src={job.jobDescriptionUploadThumbnail} alt={job.jobTitle} />
          </Link>
        </Box>
        {renderProperty('Employer', job.employer)}
        {renderProperty('Sector', job.sector, true, sectorOptions)}
        {renderProperty('Work Type', job.workType, true, workTypeOptions)}
        {renderProperty('Location Type', job.locationType, true, locationTypeOptions)}
        {renderProperty('Location', job.location)}        
        {renderProperty('Pay Range', job.payRange)}
        {renderProperty('Benefits', job.benefits)}
        {renderProperty('Start Date', job.startingDate)}
        {renderProperty('Closing Date', job.closingDate)}
        {renderProperty('Navajo Preference?', job.navajoPreference)}
        {renderProperty('Veteran Preference', job.veteranPreference)}                
        {renderProperty('Classification', job.classification)}
        {renderProperty('Preferred Educational/Experience', job.preferredEdExp)}
        {renderProperty('Required Documents', job.requiredDocuments)}
        {renderProperty('Additional Requirements', job.additionalReq)}
        {renderProperty('Application Instructions', job.applicationIn)}
        <Box mt={3}>
          <Button as={Link} href={job.applicationLink} isExternal colorScheme='blue' variant={'solid'} width={{ base: '100%', md: 'md' }}>Apply Now</Button>
        </Box>
      </SimpleGrid>
    </Box>
  )
  
}

export default JobPage