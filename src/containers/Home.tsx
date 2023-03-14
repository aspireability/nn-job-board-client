import { Box, Heading, HStack, Input, List, Select, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { IFilterOptions, JobContextValue, useJob } from '../store/JobStore';
import { IJob } from '../types/types';

const Home = () => {
    const {
        jobs, 
        isFetchingJobs,
        fetchJobs
      } = useJob() as JobContextValue;  
    
      const [searchTerm, setSearchTerm] = useState<string>('');
      const [workType, setWorkType] = useState<string>('');
      const [sector, setSector] = useState<string>('');

      useEffect(() => {
        const filterOptions: IFilterOptions = {};
        if (searchTerm !== '') filterOptions.searchTerm = searchTerm;
        // TODO work type, sector
        
        fetchJobs(filterOptions)
      }, [searchTerm, workType, sector]);
           
      const renderJobs = () => {
        if (isFetchingJobs) {
          return <Text>Loading ...</Text>
        }
    
        if (jobs === undefined) {
          return <Text>Error fetching jobs</Text>
        }

       return jobs.map((job: IJob) => {
        const path = '/job/'+job.id;

        return (
           <Link to={path}><HomePage job={job}/></Link> 
        )
       })
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