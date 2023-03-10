import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { JobContextValue, useJob } from '../store/JobStore';
import { IJob } from '../types/types';

const Home = () => {
    const {
        jobs, 
        isFetchingJobs,
        fetchJobs
      } = useJob() as JobContextValue;  
    
      useEffect(() => {
        fetchJobs()
      }, []);

      const renderJobs = () => {
        if (isFetchingJobs) {
          return <Text>Loading ...</Text>
        }
    
        if (jobs === undefined) {
          return <Text>Error fetching jobs</Text>
        }
    
        return jobs.map((job: IJob) => {
          const path = '/job/'+job.id;
    
          <Link to={path}><HomePage /></Link>
        });
      }
    
      return (
        <Box>
          <Heading>Home Page</Heading>
          <Heading>Jobs</Heading>
          <Box>
          {renderJobs()}
          </Box>
        </Box>
      )
}

export default Home