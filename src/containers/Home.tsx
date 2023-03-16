import { Box, Button, Heading, HStack, Input, List, Select, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { IFilterOptions, JobContextValue, useJob } from '../store/JobStore';
import { IJob } from '../types/types';

const Home = () => {
    const navigate = useNavigate();
    const {
        jobs, 
        isFetchingJobs,
        fetchJobs,
        allJobs,
        currentPage,
        movePage
      } = useJob() as JobContextValue;
    
      const [searchTerm, setSearchTerm] = useState<string>('');
      const [workType, setWorkType] = useState<string>('');
      const [sector, setSector] = useState<string>('');

      const handleSearch = (event: any) => {setSearchTerm(event.target.value)};
      const handleWorkType = (event: any) => {setWorkType(event.target.value)};
      const handleSector = (event: any) => {setSector(event.target.value)};

      useEffect(() => {
        const filterOptions: IFilterOptions = {};
        if (searchTerm !== '') filterOptions.searchTerm = searchTerm;
        if (workType !== '') filterOptions.workType = workType;
        if (sector !== '') filterOptions.sector = sector;
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
                        <Input placeholder='Search by title, description or location' onChange={handleSearch} value={searchTerm} />
                    </Box>
                    <Spacer />
                    <Box>
                    <Heading>Sector</Heading>
                        <Select placeholder='Select' onChange={handleSector} value={sector} >
                            <option value='Tribal Enterprise'>Tribal Enterprise</option>
                            <option value='Government'>Government</option>
                            <option value='Non-Profit Organization'>Non-Profit Organization</option>
                            <option value='Private Sector'>Private Sector</option>
                        </Select>
                    </Box>
                    <Spacer />
                    <Box>
                        <Heading>Work Type</Heading>
                        <Select placeholder='Select' onChange={handleWorkType} value={workType} >
                            <option value='Full Time'>Full Time</option>
                            <option value='Part Time'>Part Time</option>
                            <option value='Seasonal'>Seasonal</option>
                            <option value='Contract'>Contract</option>
                            <option value='Temporary'>Temporary</option>
                        </Select>
                    </Box>
                </HStack>
            </List>
        </Box>
        <Box>
            <HStack>
                <Text>Showing 1-{jobs?.length} Jobs of {allJobs?.length} results</Text>
                <Spacer />
                <Button onClick={() => movePage(currentPage)}>Previous</Button>
                <Button onClick={() => movePage(currentPage)} width={'90px'}>Next</Button>
            </HStack>
        </Box>
          <Box>
          {renderJobs()}
          </Box>
        </Box>
      )
}

export default Home