import React, { createContext, useContext, useState } from 'react';
import { airtableApi } from '../api/airtableApi';
import { get as lodashGet } from 'lodash';
import { IJob } from '../types/types';

const transformAirtableRecord = (airtableRecord: any): IJob => {
  const job: IJob = {
    id: airtableRecord['id'],
    jobTitle: airtableRecord['fields']['Job Title'],
    jobDescription: airtableRecord['fields']['Job Description'],
    jobDescriptionUpload: lodashGet(airtableRecord, 'fields.Job Description Document (Upload).0.url'),
    jobDescriptionUploadThumbnail: lodashGet(airtableRecord, 'fields.Job Description Document (Upload).0.thumnails.large.url'),
    employer: airtableRecord['fields']['Employer'],
    sector: airtableRecord['fields']['Sector'],
    workType: airtableRecord['fields']['Work Type'],
    locationType: airtableRecord['fields']['Location Type'],
    location: airtableRecord['fields']['Location'],
    payRange: airtableRecord['fields']['Pay Range'],
    hourlyWages: airtableRecord['fields']['Hourly Wage'],
    payCode: airtableRecord['fields']['Pay Code'],
    benefits: airtableRecord['fields']['Benefits'],
    startingDate: airtableRecord['fields']['Start Date'],
    closingDate: airtableRecord['fields']['Closing Date'],
    address: airtableRecord['fields']['Address'],
    navajoPreference: airtableRecord['fields']['Navajo Preference?'],
    veteranPreference: airtableRecord['fields']['Veteran Preference'],
    requiredDocuments: airtableRecord['fields']['Required Documents'],
    classification: airtableRecord['fields']['Classification'],
    preferredEdExp: airtableRecord['fields']['Preferred Educational/Experience '],
    additionalReq: airtableRecord['fields']['Additional Requirements'],
    applicationIn: airtableRecord['fields']['Application Instructions'],
    applicationLink: airtableRecord['fields']['Application Link']
  }
  return job;
}

export interface IFilterOptions {
  searchTerm?: string,
  workType?: string,
  sector?: string,
}

export type JobContextValue = {
  jobs: IJob[] | undefined;
  allJobs: IJob[] | undefined;
  isFetchingJobs: boolean;
  isFetchingAllJobs: boolean;
  fetchJobs: (filterOptions: IFilterOptions) => void;
  isFetchingCurrentJob: boolean;
  fetchCurrentJob: (id: string) => void;
  currentJob: IJob | undefined;
  currentPage: number;
  movePage: (pageNumber: number) => void;
  
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

export const useJob = () => useContext(JobContext);

const JobProvider = ({ children }: any) => {
  const [jobs, setJobs] = useState<IJob[] | undefined>(undefined);
  const [allJobs, setAllJobs] = useState<IJob[] | undefined>(undefined);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [isFetchingAllJobs, setIsFetchingAllJobs] = useState(false);
  const [isFetchingCurrentJob, setIsFetchingCurrentJob] = useState(false);
  const [currentJob, setCurrentJob] = useState<IJob | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const fetchJobs = async (filterOptions: IFilterOptions) => {
      let fetchedFirstPage = false;
      let allJobsCollector: IJob[] = [];

      setIsFetchingJobs(true);
      setIsFetchingAllJobs(true);

      const filterConstraints = [];
      if (filterOptions.searchTerm) {
        const columnsToSearch = ['Job Title', 'Job Description', 'Location'];
        const searchQueries = columnsToSearch.map((column: string) => `SEARCH('${filterOptions.searchTerm}',{${column}})`);        
        const combinedSearch = `OR(${searchQueries.join(',')})`;
        console.log('combinedSearch', combinedSearch);
        filterConstraints.push(combinedSearch);
      }
      if (filterOptions.workType) {
        filterConstraints.push(`{Work Type}='${filterOptions.workType}'`)
      }
      if (filterOptions.sector) {
        filterConstraints.push(`{Sector}='${filterOptions.sector}'`)
      }
      // TODO sector

      let filterByFormula = ''
      if (filterConstraints.length === 1) {
        filterByFormula = filterConstraints[0]
      }
      else if (filterConstraints.length > 1) {
        filterByFormula = `AND(${filterConstraints.join(',')})`;
      }

      airtableApi('Job Listing Data').select({
        // view: 'NN Job Board Website View',
        filterByFormula
      }).eachPage(function page(records, fetchNextPage) {
          const transformedJobs = records.map((record: any) => {
            return transformAirtableRecord(record) as IJob;
          });

          allJobsCollector = allJobsCollector.concat(transformedJobs)
          if (!fetchedFirstPage) {
            setJobs(transformedJobs);
            setIsFetchingJobs(false);
            fetchedFirstPage = true;
          }

          fetchNextPage();

      }, function done(err) {
        console.log('retrieved all jobs', allJobsCollector.length)
        setAllJobs(allJobsCollector)
        setIsFetchingAllJobs(false); 
      });
  }

  const movePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setJobs(allJobs)
    const page_size = 100;
    const end = pageNumber * page_size;
    const start = end - page_size;
    console.log('pageNumber', pageNumber);
    setJobs(allJobs?.slice(start, end));
  }
  

  const fetchCurrentJob = async (id: string) => {
      setIsFetchingCurrentJob(true)
      airtableApi('Job Listing Data').find(id, function(err, record) {
          if (err) { console.error(err); return; }
          console.log('current record', record);
          const transformedJob = transformAirtableRecord(record);
          console.log('transformedJob', transformedJob);
          setCurrentJob(transformedJob)
          setIsFetchingCurrentJob(false)
      });       
  }

  return (
    <JobContext.Provider
      value={{
          jobs,
          isFetchingJobs,
          allJobs,
          isFetchingAllJobs,  
          fetchJobs,
          isFetchingCurrentJob,
          fetchCurrentJob,
          currentJob,
          currentPage,
          movePage
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobProvider;