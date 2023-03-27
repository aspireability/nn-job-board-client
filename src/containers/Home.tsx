import { Box, Button, Link, HStack, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Spacer, Text, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import { IFilterOptions, JobContextValue, useJob } from '../store/JobStore';
import { SearchIcon } from '@chakra-ui/icons'

const Home = () => {
    const navigate = useNavigate();
    const {
        jobs, 
        isFetchingJobs,
        fetchJobs,
        allJobs,
        currentPage,
        movePage,
        currentFilterOptions
      } = useJob() as JobContextValue;

      const [searchTerm, setSearchTerm] = useState<string>(currentFilterOptions?.searchTerm || '');
      const [workType, setWorkType] = useState<string>(currentFilterOptions?.workType || '');
      const [sector, setSector] = useState<string>(currentFilterOptions?.sector || '');

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
          return (
            <Box>
              <Text fontSize="sm">Loading pages ...</Text>
            </Box>
          );
        }

        var currentPageEquals1 = currentPage === 1;
        var currentPageEqualsLastPage = currentPage === Math.ceil(allJobs.length / 100);

        var endCount = currentPageEquals1 ? jobs.length : ((currentPage-1) * 100) + jobs.length;
        var startCount = currentPageEquals1 ? 1 : ((currentPage-1) * 100) + 1;

        return (
            
        <Box>
            <HStack>
                <Text fontSize="sm">Jobs {startCount}-{endCount} of {allJobs.length}</Text>
                <Spacer />
                <Button size={{ base: 'xs', md: 'sm' }} onClick={() => movePage(currentPage - 1)} isDisabled={currentPageEquals1}>Previous</Button>
                <Button size={{ base: 'xs', md: 'sm' }} onClick={() => movePage(currentPage + 1)} width={'90px'} isDisabled={currentPageEqualsLastPage}>Next</Button>
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
                  {/* <Text fontSize="sm">Search</Text> */}
                  <InputGroup>
                    <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.900' />} />
                    <Input size="sm" placeholder='Search by title or location' onChange={handleSearch} value={searchTerm} />
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