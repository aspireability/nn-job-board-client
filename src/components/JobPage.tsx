import { Box, Button, Heading, HStack, Text, Image, Link, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { DownloadIcon } from '@chakra-ui/icons'
import { IJob, IJobFile } from '../types/types'
import { colorSchemes, locationTypeOptions, sectorOptions, workTypeOptions } from '../util/jobPropertyOptions';
import { renderTag } from '../util/tags';
import ReactGA from 'react-ga4';
import sanitizeHtml from 'sanitize-html';

interface JobPageProps {
    job: IJob;
}

const baseUrl = process.env.REACT_APP_DIRECTUS_URL as string;

const JobPage = ({
    job
}: JobPageProps) => {
    var applyLink = job.applicationLink !== '' && job.applicationLink !== undefined && job.applicationLink !== null;
    
  const renderLabel = (label: string) => {
    return (
      <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">{label}</Text>
    )
  }

  const onApplyTrack = () => {
    const payload = {
      category: 'Job',
      action: 'Apply',
      label: `${(job.jobTitle as string)} - ${job.id}`
    };
    console.log('on apply track', payload);
    ReactGA.event(payload);
  }

  const renderProperty = (label: string, value?: string, asTag: boolean = false, options: string[] = []) => {
    const indexofValue = options.indexOf(value || '');
    const colorScheme = indexofValue > -1 ? colorSchemes[indexofValue] : 'gray';
    const display = value ? sanitizeHtml(value) : 'N/A';
    return (
      <Box mb={3}>
        {renderLabel(label)}
        { asTag ? renderTag(value || 'N/A', 'md', colorScheme) : <Text fontSize={{ base: 'ld', md: 'xl' }} dangerouslySetInnerHTML={{__html: display }} /> }        
      </Box>
    )
  }

  const renderJobDescriptionFiles = () => {
    if (!job.jobDescriptionUpload || job.jobDescriptionUpload.length === 0) {
      return (
        <Text fontSize={{ base: 'ld', md: 'xl' }}>N/A</Text>
      )
    }

    return (
      <HStack>
        {job.jobDescriptionUpload.map((file: IJobFile) => {
          const fileUrl = `${baseUrl}/assets/${file.fileId}`;
          const thumbnailUrl = `${fileUrl}?key=thumb`;
          const downloadUrl = `${fileUrl}?download`;
          return (
            <Box>
              <Link href={fileUrl} cursor="pointer" isExternal={true}>
                <Image boxSize={{ base: '50px', md: '100px' }} src={thumbnailUrl} alt={file.fileName} border="2px solid" borderColor="gray.400" />              
              </Link>
              <Link href={downloadUrl} cursor="pointer" fontSize={{ base: 'sm' }} color='blue.600'>
                <DownloadIcon /> Download
              </Link>
            </Box>            
          )
        })}        
      </HStack>
    )
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 1 }}>
        <Heading mb={{ base: 2, md: 5 }}>{job.jobTitle}</Heading>
        {renderProperty('Posting Id', job.postingID)}
        {renderProperty('Job Description', job.jobDescription)}
        <Box mb={3}>
          {renderLabel('Job Description Document (Click to view)')}
          {renderJobDescriptionFiles()}
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
        {applyLink ? 
        <Box mt={3}>
          <Button as={Link} href={job.applicationLink} onClick={onApplyTrack} isExternal colorScheme='blue' variant={'solid'} width={{ base: '100%', md: 'md' }}>Apply Now</Button>
          </Box>
          : null }
      </SimpleGrid>
    </Box>
  )
  
}

export default JobPage