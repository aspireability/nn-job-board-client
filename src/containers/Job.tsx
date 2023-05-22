import { Box, Button, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'
import JobPage from '../components/JobPage';
import { JobContextValue, useJob } from '../store/JobStore';

const Job = () => {
    const { jobId } = useParams();
    const {
        isFetchingCurrentJob,
        fetchCurrentJob,
        currentJob,
    } = useJob() as JobContextValue;  
    
      useEffect(() => {
       fetchCurrentJob(jobId as string)
      }, []);

      const renderCurrentJob = () => {
        if (isFetchingCurrentJob) {
            return <Text>Loading ...</Text>
          }
      
          if (currentJob === undefined) {
            return <Text>Error fetching job</Text>
          }

          console.log(currentJob)
          
          return <JobPage job={currentJob} />
      }
    
    return (
        <Box px={{ base: 4, md: 10 }} py={{ base: 4, md: 7 }} mb={7}>
          <Box mb={{ base: 3, md: 7 }}>
            <ChakraLink as={Link} to="/jobs" color='blue.600'><ArrowBackIcon /> Back to Jobs</ChakraLink>
          </Box>          
          <Box>
            {renderCurrentJob()}
          </Box>          
        </Box>
      )
}

export default Job