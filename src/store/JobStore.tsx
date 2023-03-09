import React, { createContext, useContext, useState } from 'react';
import { get } from '../api/airtableApi';

export type JobContextValue = {
    isFetchJob: boolean;
    fetchJob: (id: string) => void;
  }
  
  const JobContext = createContext<JobContextValue | undefined>(undefined);
  
  export const useJob = () => useContext(JobContext);
  
  const JobProvider = ({ children }: any) => {
    const [isFetchJob, setIsFetchJob] = useState(false);

    const fetchJob = async (id: string) => {
        setIsFetchJob(true)
        // call api get with path 'Job Listing Data'
        setIsFetchJob(false) 
    }

    // fetchCurrentJob
      // call api get with path 'Job Listing Data/{id}'


    
  
    return (
      <JobContext.Provider
        value={{
          isFetchJob,
          fetchJob,
        }}
      >
        {children}
      </JobContext.Provider>
    )
  }


export default JobProvider;