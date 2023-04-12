import React, { createContext, useContext, useState } from 'react';
import { directusEnv } from '../api/directusApi';
import { IJob } from '../types/types';

const transformDirectusRecord = (directusRecord: any): IJob => {
  const job: IJob = {
    id: directusRecord['id'],
    jobTitle: directusRecord['Job_Title'],
    jobDescription: directusRecord['Job_Description'],
    // jobDescriptionUpload: lodashGet(directusRecord, 'fields.Job Description Document (Upload).0.url'),
    // jobDescriptionUploadThumbnail: lodashGet(directusRecord, 'fields.Job Description Document (Upload).0.thumbnails.large.url'),
    employer: directusRecord['Employer'],
    sector: directusRecord['Sector'],
    workType: directusRecord['Work_Type'],
    locationType: directusRecord['Location_Type'],
    location: directusRecord['Location'],
    payRange: directusRecord['Pay_Range'],
    hourlyWages: directusRecord['Hourly_Wage'],
    payCode: directusRecord['Pay_Code'],
    benefits: directusRecord['Benefits'],
    startingDate: directusRecord['Start_Date'],
    closingDate: directusRecord['Closing_Date'],
    address: directusRecord['Address'],
    navajoPreference: directusRecord['Navajo_Preference?'],
    veteranPreference: directusRecord['Veteran_Preference'],
    requiredDocuments: directusRecord['Required_Documents'],
    classification: directusRecord['Classification'],
    preferredEdExp: directusRecord['Preferred_Educational_Experience'],
    additionalReq: directusRecord['Additional_Requirements'],
    applicationIn: directusRecord['Application_Instructions'],
    applicationLink: directusRecord['Application_Link']
  }
  return job;
}

export interface IFilterOptions {
  jobTitle?: string,
  location?: string,
  workType?: string,
  sector?: string,
}

export type JobContextValue = {
  jobs: IJob[] | undefined;
  isFetchingJobs: boolean;
  isFetchingCurrentJob: boolean;
  currentJob: IJob | undefined;
  currentPage: number;
  currentFilterOptions: IFilterOptions | undefined;
  currentJobsFilterCount: number;  
  fetchJobs: (filterOptions: IFilterOptions) => void;  
  fetchCurrentJob: (id: string) => void;
  movePage: (pageNumber: number) => void;  
}

const JobContext = createContext<JobContextValue | undefined>(undefined);

export const useJob = () => useContext(JobContext);

const JobProvider = ({ children }: any) => {
  const [jobs, setJobs] = useState<IJob[] | undefined>(undefined);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);
  const [isFetchingCurrentJob, setIsFetchingCurrentJob] = useState(false);
  const [currentJob, setCurrentJob] = useState<IJob | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentJobsFilterCount, setCurrentJobsFilterCount] = useState<number>(0);
  const [currentFilterOptions, setCurrentFilterOptions] = useState<IFilterOptions>({});


  const fetchJobs = async (filterOptions: IFilterOptions, pageNumber?: number) => {
      // if jobs is not undefined (means we have a previous load)
      // AND incoming filter options has not changed from current filter options
      // then return
      if (jobs !== undefined) {
        if (filterOptions.jobTitle === currentFilterOptions.jobTitle 
            && filterOptions.sector === currentFilterOptions.sector 
            && filterOptions.workType === currentFilterOptions.workType
            && pageNumber === currentPage) {
                return
        }
      }

      setIsFetchingJobs(true);
      setCurrentFilterOptions(filterOptions)
      setCurrentPage(pageNumber || 1)

      // Build filter query
      const directusQuery: any = {
        sort: ['Job_Title'],
        filter: {},
        meta: '*',
        page: pageNumber,
      };

      const filterCollector: any[] = [];

      if (filterOptions.jobTitle) {
        filterCollector.push({ 'Job_Title': { '_icontains': filterOptions.jobTitle }})        
      }
      if (filterOptions.location) {
        filterCollector.push({ 'Location': { '_icontains': filterOptions.location }})
      }
      if (filterOptions.workType) {
        filterCollector.push({ 'Work_Type': { '_eq': filterOptions.workType }})
      }
      if (filterOptions.sector) {
        filterCollector.push({ 'Sector': { '_eq': filterOptions.sector }})
      }

      if (filterCollector.length > 0) {
        directusQuery['filter']['_and']=filterCollector;
      }

      // Query API
      const response = await directusEnv.getMany('Jobs', directusQuery)
      const fetchedJobs = response.data;
      const transformedJobs = fetchedJobs.map((record: any) => {
        return transformDirectusRecord(record) as IJob;
      });
      
      setJobs(transformedJobs);
      setIsFetchingJobs(false);
      setCurrentJobsFilterCount(response.meta.filter_count)      
  }

  const movePage = (pageNumber: number) => {
    fetchJobs(currentFilterOptions, pageNumber)
  }
  

  const fetchCurrentJob = async (id: string) => {
    setIsFetchingCurrentJob(true)

    const response = await directusEnv.getOne('Jobs', id);
    const transformedJob = transformDirectusRecord(response);
    setCurrentJob(transformedJob)
    setIsFetchingCurrentJob(false);
  }


  return (
    <JobContext.Provider
      value={{
          jobs,
          isFetchingJobs,
          fetchJobs,
          isFetchingCurrentJob,
          fetchCurrentJob,
          currentJob,
          currentJobsFilterCount, 
          currentPage,
          movePage,
          currentFilterOptions
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobProvider;