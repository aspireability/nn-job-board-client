import { Box, Button, Link, HStack, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spacer, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { IFilterOptions, JobContextValue, useJob } from '../store/JobStore';
import { SearchIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react';
import { MdOutlineLocationOn } from 'react-icons/md';

const Home = () => {
    const navigate = useNavigate();
    const {
        jobs, 
        isFetchingJobs,
        fetchJobs,
        currentJobsFilterCount,
        currentPage,
        movePage,
        currentFilterOptions
      } = useJob() as JobContextValue;

      const [jobTitle, setJobTitle] = useState<string>(currentFilterOptions?.jobTitle || '');
      const [location, setLocation] = useState<string>(currentFilterOptions?.location || '');
      const [workType, setWorkType] = useState<string>(currentFilterOptions?.workType || '');
      const [sector, setSector] = useState<string>(currentFilterOptions?.sector || '');

      const handleJobTitle = (event: any) => {setJobTitle(event.target.value)};
      const handleLocation = (event: any) => {setLocation(event.target.value)};
      const handleWorkType = (event: any) => {setWorkType(event.target.value)};
      const handleSector = (event: any) => {setSector(event.target.value)};

      useEffect(() => {
        const filterOptions: IFilterOptions = {};
        if (jobTitle !== '') filterOptions.jobTitle = jobTitle;
        if (location !== '') filterOptions.location = location;
        if (workType !== '') filterOptions.workType = workType;
        if (sector !== '') filterOptions.sector = sector;
        // TODO work type, sector
        
        fetchJobs(filterOptions)
      }, [jobTitle, location, workType, sector]);

      const clearFilter = () => {
        setJobTitle('');
        setLocation('');
        setWorkType('');
        setSector('');
      }

      

      const renderPages = () => {
        if (jobs === undefined) {
          return (
            <Box>
              <Text fontSize="sm">Loading pages ...</Text>
            </Box>
          );
        }

        var isFirstPage = currentPage === 1;
        var isLastPage = currentPage === Math.ceil(currentJobsFilterCount / 100);
        
        var startCount = isFirstPage ? 1 : ((currentPage-1) * 100) + 1;
        var endCount = isLastPage ? currentJobsFilterCount : ((currentPage-1) * 100) + jobs.length;

        return (
            
        <Box>
            <HStack>
            {currentJobsFilterCount === 0 ? (
                  <Text fontSize="sm">No jobs found matching your search.</Text>  
                ) : (
                  <Text fontSize="sm">Jobs {startCount}-{endCount} of {currentJobsFilterCount}</Text>
                )}
                <Spacer />
                <Button size={{ base: 'xs', md: 'sm' }} onClick={() => movePage(currentPage - 1)} isDisabled={isFirstPage}>Previous</Button>
                <Button size={{ base: 'xs', md: 'sm' }} onClick={() => movePage(currentPage + 1)} width={'90px'} isDisabled={isLastPage}>Next</Button>
            </HStack>
        </Box>
        )
      }
           
      const renderJobs = () => { 
        if (isFetchingJobs) {
          return (
            <HStack>
              <Spinner />
              <Text>Loading Jobs</Text>
            </HStack>            
          )
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
        <>
          <Box
            borderBottom="1px"
            borderColor="gray.300"
            px={{ base: 4, md: 10 }}
            py={{ base: 2, md: 4 }}
            bgColor="white"
            width="100%"
          >
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={2} alignItems="end">
              <Box>
                  <HStack>
                    <InputGroup>
                      <InputLeftElement mt="-1" pointerEvents='none' children={<SearchIcon color='gray.900' />} />
                      <Input size="sm" placeholder='Search Job Title' onChange={handleJobTitle} value={jobTitle} />                    
                    </InputGroup>
                    <InputGroup>
                      <InputLeftElement mt="-1" pointerEvents='none' children={<Icon as={MdOutlineLocationOn} color='gray.900' />} />
                      <Input size="sm" placeholder='Search Location' onChange={handleLocation} value={location} />
                    </InputGroup>
                  </HStack>                                    
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
          </Box>
          <Box flexGrow="1" overflow="auto" pb={15}>          
            <Box px={{ base: 4, md: 10 }} py={{ base: 2, md: 4 }} >
              {renderJobs()}
            </Box>
          </Box>
          <Box
            px={{ base: 4, md: 10 }}
            py={{ base: 2, md: 4 }}
            borderTop="1px"
            borderColor="gray.300"
          >
            {renderPages()}
          </Box>       
        </>
      )
}

export default Home