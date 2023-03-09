import React, { createContext, useContext, useState } from 'react';
import { get } from '../api/airtableApi';
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
  
//   const transformAirtableRecord = (airtableRecord: IJob) => {
//     airtableRecord.jobTitle : 
//   }
  const JobProvider = ({ children }: any) => {
    const [jobs, setJobs] = useState(undefined);
    const [isFetchingJobs, setIsFetchingJobs] = useState(false);
    const [isFetchingCurrentJob, setIsFetchingCurrentJob] = useState(false);
    const [currentJob, setCurrentJob] = useState<IJob | undefined>(undefined);

    const fetchJobs = async () => {
        setIsFetchingJobs(true);
        // call api get with path 'Job Listing Data'
        const josbResponse = await get('/ob%20Listing%20Data') ;
        setJobs(josbResponse);
        setIsFetchingJobs(false);
    }
    

    const fetchCurrentJob = async (id: string) => {
        setIsFetchingCurrentJob(true)
        // call api get with path 'Job Listing Data/{id}'
        const currentJobResponse = await get('/ob%20Listing%20Data' + {id}); 
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