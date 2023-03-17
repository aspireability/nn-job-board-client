import { Box, Button, Link, HStack, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { IFilterOptions, JobContextValue, useJob } from '../store/JobStore';
import { IJob } from '../types/types';
import { SearchIcon } from '@chakra-ui/icons'

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

      const clearFilter = () => {
        setSearchTerm('');
        setWorkType('');
        setSector('');
      }

      

      const renderPages = () => {
        if (allJobs === undefined || jobs === undefined) {
          return null;
        }

        var currentPageEquals1 = currentPage === 1;
        var currentPageEqualsLastPage = currentPage === Math.ceil(allJobs.length / 100);

        var endCount = currentPageEquals1 ? jobs.length : ((currentPage-1) * 100) + jobs.length;
        var startCount = currentPageEquals1 ? 1 : ((currentPage-1) * 100) + 1;

        return (
            
        <Box>
            <HStack>
                <Text fontSize="sm">Jobs {startCount}-{endCount} of {allJobs.length} results</Text>
                <Spacer />
                {!currentPageEquals1 && <Button size="sm" onClick={() => movePage(currentPage - 1)}>Previous</Button>}
                {currentPageEquals1 && <Button size="sm" onClick={() => movePage(currentPage - 1)} isDisabled>Previous</Button>}
                {!currentPageEqualsLastPage && <Button size="sm" onClick={() => movePage(currentPage + 1)} width={'90px'}>Next</Button>}
                {currentPageEqualsLastPage && <Button size="sm" onClick={() => movePage(currentPage + 1)} width={'90px'} isDisabled >Next</Button>}
            </HStack>
        </Box>
        )
      }
           
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
          <Box
            borderBottom="1px"
            borderColor="gray.300"
            px={{ base: 4, md: 10 }}
            py={{ base: 2, md: 4 }}
            position="fixed"
            bgColor="white"
            top={{ base: 102, md: 128 }}
            width="100%"
          >
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={2} alignItems="end">
              <Box>
                  {/* <Text fontSize="sm">Search</Text> */}
                  <InputGroup>
                    <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.900' />} />
                    <Input size="sm" placeholder='Search by title, employer or location' onChange={handleSearch} value={searchTerm} />
                  </InputGroup>                  
              </Box>
              <HStack>
              <Box width="100%">
                    {/* <Text fontSize="sm">Sector</Text> */}
                    <Select placeholder='All Sectors' onChange={handleSector} value={sector} size="sm" >
                        <option value='Tribal Enterprise'>Tribal Enterprise</option>
                        <option value='Government'>Government</option>
                        <option value='Non-Profit Organization'>Non-Profit Organization</option>
                        <option value='Private Sector'>Private Sector</option>
                    </Select>
                </Box>
                <Box width="100%">
                    {/* <Text fontSize="sm">Work Type</Text> */}
                    <Select placeholder='All Work Type' onChange={handleWorkType} value={workType} size="sm" >
                        <option value='Full Time'>Full Time</option>
                        <option value='Part Time'>Part Time</option>
                        <option value='Seasonal'>Seasonal</option>
                        <option value='Contract'>Contract</option>
                        <option value='Temporary'>Temporary</option>
                    </Select>
                </Box>
              </HStack>        
              <Box><Link fontSize="sm" color='blue.500' onClick={clearFilter} >Clear Search</Link></Box>             
            </SimpleGrid>
            <Box mt={2}>{renderPages()}</Box>            
          </Box>
          <Box mt={{ base: "190px", md: "125px" }} pb={15}>          
            <Box px={{ base: 4, md: 10 }} >
              {renderJobs()}
            </Box>
          </Box>          
        </Box>
      )
}

export default Home