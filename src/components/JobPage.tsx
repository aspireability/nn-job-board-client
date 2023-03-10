import { Box, Button, Heading, HStack, List, ListItem, VStack, Text, ListIcon, Image, Spacer, Link } from '@chakra-ui/react'
import { BsDash } from 'react-icons/bs'
import React from 'react'
import { IJob } from '../types/types'
import { example } from '../mock_data/data'

interface JobPageProps {
    job: IJob;
}

const JobPage = ({
    job
}: JobPageProps) => {

var jobHasClassification = job.classification !== '' && job.classification !== undefined;
    
  return (
    <Box boxShadow={'xl'} p='6' rounded='md' bg='white'>
        <Box>
            <Text fontWeight={'semibold'}>Job Title</Text>
            <Heading>{job.jobTitle}</Heading>
        </Box>
        <VStack>
            <Box>
                <HStack>
                    <Box marginRight={'100'}>
                        <List spacing={'10'}>
                        <Box boxSize='sm'>
                            <Text fontWeight={'semibold'}>Job Description Document (Upload)</Text>
                            <Image src={job.jobDescriptionUpload} alt={job.jobTitle} />
                            {job.jobDescriptionUploadThumbnail}
                        </Box>
                        <Box>
                            <Text fontWeight={'semibold'}>Location Type</Text>
                            {job.locationType}
                        </Box>
                        <Box>
                            <Text fontWeight={'semibold'}>Location</Text>
                            {job.location}
                        </Box>
                        <Box>
                            <Text fontWeight={'semibold'}>Work Type</Text>
                            {job.workType}
                        </Box>
                        <Box>
                            <Text fontWeight={'semibold'}>Application Instructions</Text>
                            {job.applicationIn}
                       </Box>
                       </List>
                    </Box>
                    <Spacer />
                    <Box>
                        <List spacing={10}>
                            <Box>
                                <Text fontWeight={'semibold'}>Job Description</Text>
                                {job.jobDescription}
                            </Box>
                            <Box>
                                <Text fontWeight={'semibold'}>Employer</Text>
                                {job.employer}
                            </Box>
                            <Box>
                                <Text fontWeight={'semibold'}>Pay Range</Text>
                                <HStack>
                                <ListIcon as={BsDash} color='black'></ListIcon>
                                {job.payRange}
                                </HStack>
                            </Box>
                            <Box>
                               <Text fontWeight={'semibold'}>Benefits</Text> 
                                    <HStack>
                                        <ListIcon as={BsDash} color='black'></ListIcon>
                                        {job.benefits}
                                    </HStack>
                            </Box>
                            <Box>
                                <HStack>
                                    <Box>
                                        <Text fontWeight={'semibold'}>Start Date</Text>
                                        {job.startingDate}
                                    </Box>
                                   <Box>
                                        <Text fontWeight={'semibold'}>Closing Date</Text>
                                        {job.closingDate}
                                    </Box>
                                </HStack>
                            </Box>
                            <Box>
                                <HStack>
                                    <Box>
                                        <Text fontWeight={'semibold'}>Navajo Preference?</Text>
                                        {job.navajoPreference}
                                    </Box>
                                    <Box>
                                        <Text fontWeight={'semibold'}>Veteran Preference</Text>
                                        {job.veteranPreference}
                                    </Box>
                                </HStack>
                            </Box>
                            <Box>
                                <Text fontWeight={'semibold'}>Required Documents</Text>
                                {job.requiredDocuments}
                            </Box>
                            {jobHasClassification && 
                            <Box>
                                <Text fontWeight={'semibold'}>Classification</Text>
                                {job.classification}
                            </Box>
                            }
                            <Box>
                                <Text fontWeight={'semibold'}>Preferred Educational/Experience</Text>
                                    <HStack>
                                        <ListIcon as={BsDash} color='black'></ListIcon>
                                        {job.preferredEdExp}
                                    </HStack>
                            </Box>
                            <Box>
                                <Text fontWeight={'semibold'}>Additonal Requirements</Text>
                                    <HStack>
                                        <ListIcon as={BsDash} color='black'></ListIcon>
                                        {job.additionalReq}
                                    </HStack>
                            </Box>
                        </List>
                    </Box>
                </HStack>
            </Box>
            <Link href={job.applicationLink} isExternal><Button colorScheme='blue' variant={'solid'} width={'xl'}>Apply Now</Button></Link>
        </VStack>            
    </Box>
  )
  
}

export default JobPage