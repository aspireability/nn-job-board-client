import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
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
        <Box backgroundColor={'azure'}>
          <Button as={Link} to="/" colorScheme='blue'>Back to Home Page</Button>
          {renderCurrentJob()}
        </Box>
      )
}

export default Job