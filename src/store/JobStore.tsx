import React, { createContext, useContext, useState } from 'react';
import { get } from '../api/airtableApi';
import { get as lodashGet } from 'lodash';
import { IJob } from '../types/types';

export type JobContextValue = {
    jobs: IJob[] | undefined;
    isFetchingJobs: boolean;
    fetchJobs: () => void;
    isFetchingCurrentJob: boolean;
    fetchCurrentJob: (id: string) => void;
    currentJob: IJob | undefined;
    
  }
  
  const JobContext = createContext<JobContextValue | undefined>(undefined);
  
  export const useJob = () => useContext(JobContext);
  
  const transformAirtableRecord = (airtableRecord: any): IJob => {
    const job: IJob = {
      id: airtableRecord['id'],
      jobTitle: airtableRecord['fields']['Job Title'],
      jobDescription: 'News/Media',
      jobDescriptionUpload: lodashGet(airtableRecord, 'fields.Job Description Document (Upload).0.url'),
      employer: 'Navajo Times',
      sector: 'Tibeal Enterprise',
      workType: 'Full Time',
      locationType: 'Hybrid',
      location: 'Window Rock, AZ',
      payRange: '',
      hourlyWages: '',
      payCode: '',
      benefits: '',
      startingDate: '2/1/2023',
      closingDate: '',
      address: '',
      navajoPreference: 'Yes',
      veteranPreference: 'No',
      requiredDocuments: 'Bachelors Degree Drivers license CIB',
      preferredEdExp: '',
      additionalReq: '',
      applicationIn: 'mail application to NT',
    }
    return job;
  }

  const JobProvider = ({ children }: any) => {
    const [jobs, setJobs] = useState(undefined);
    const [isFetchingJobs, setIsFetchingJobs] = useState(false);
    const [isFetchingCurrentJob, setIsFetchingCurrentJob] = useState(false);
    const [currentJob, setCurrentJob] = useState<IJob | undefined>(undefined);

    const fetchJobs = async () => {
        setIsFetchingJobs(true);
        // call api get with path 'Job Listing Data'
        const josbResponse = await get('Job Listing Data') ;
        const records = josbResponse.records;
        console.log('records', josbResponse);
        const transformedJobs = records.map((record: any) => {
          return transformAirtableRecord(record);
        });
        console.log('transformedJobs', transformedJobs);
        setJobs(transformedJobs);
        setIsFetchingJobs(false);
    }
    

    const fetchCurrentJob = async (id: string) => {
        setIsFetchingCurrentJob(true)
        // call api get with path 'Job Listing Data/{id}'
        const currentJobResponse = await get(`Job Listing Data/${id}`); 
        setCurrentJob(currentJobResponse)
        setIsFetchingCurrentJob(false) 
    }
      
  
    return (
      <JobContext.Provider
        value={{
            jobs,
            isFetchingJobs,
            fetchJobs,
            isFetchingCurrentJob,
            fetchCurrentJob,
            currentJob
        }}
      >
        {children}
      </JobContext.Provider>
    )
  }


export default JobProvider;