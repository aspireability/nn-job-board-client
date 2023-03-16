import { Box, Heading, HStack, Input, List, Select, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { JobContextValue, useJob } from '../store/JobStore';
import { IJob } from '../types/types';

const Home = () => {
    const navigate = useNavigate();
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

        const onJobClick = (jobId: string) => {
          const path = '/job/'+jobId;
          navigate(path);
        }

       return <HomePage jobs={jobs} onJobClick={onJobClick} />
      }
    
      return (
        <Box>
          <Heading>Home Page</Heading>
          <Box marginBottom={'4'}>
            <List spacing={'10'}>
                <HStack>
                    
                    <Box>
                        <Heading>Search</Heading>
                        <Input />
                    </Box>
                    <Spacer />
                    <Box>
                        <Heading>Location</Heading>
                        <Input />
                    </Box>
                    <Spacer />
                    <Box>
                        <Heading>Work Type</Heading>
                        <Select placeholder='Select'>
                            <option value='FullTime'>FullTime</option>
                            <option value='PartTime'>PartTime</option>
                        </Select>
                    </Box>
                </HStack>
            </List>
        </Box>
          <Box>
          {renderJobs()}
          </Box>
        </Box>
      )
}

export default Home