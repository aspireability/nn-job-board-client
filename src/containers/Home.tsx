import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { JobContextValue, useJob } from '../store/JobStore';
import { IJob } from '../types/types';

const Home = () => {
    const {
        jobs, 
        isFetchingJobs,
        fetchJobs
      } = useJob() as JobContextValue;  
    
      useEffect(() => {
        // fetchJobs()
      }, []);

    //   const renderJobs = () => {
    //     if (isFetchingJobs) {
    //       return <Text>Loading ...</Text>
    //     }
    
    //     if (jobs === undefined) {
    //       return <Text>Error fetching jobs</Text>
    //     }
    
    //     // return jobs.map((job: IJob) => {
    //     //   const path = '/job/'+job;
    
          
    //     // });
    //   }
    
      return (
        <Box>
          <Heading>Home Page</Heading>
          <Heading>Jobs</Heading>
          {/* <Box>
          {renderJobs()}
          </Box> */}
        </Box>
      )
}

export default Home