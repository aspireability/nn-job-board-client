import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { JobContextValue, useJob } from '../store/JobStore';

const Job = () => {
    const {
        isFetchingCurrentJob,
        fetchCurrentJob,
        currentJob,
    } = useJob() as JobContextValue;  
    
      useEffect(() => {
    //    fetchCurrentJob()
      }, []);

      const renderCurrentJob = () => {
        if (isFetchingCurrentJob) {
            return <Text>Loading ...</Text>
          }
      
          if (currentJob === undefined) {
            return <Text>Error fetching occasion</Text>
          }
      }
    
    return (
        <Box backgroundColor={'azure'}>
          <Button as={Link} to="/" colorScheme='blue'>Back to Home Page</Button>
          <Heading>Job Page</Heading>
    
          {renderCurrentJob()}
        </Box>
      )
}

export default Job