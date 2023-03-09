import React, { createContext, useContext, useState } from 'react';

export type JobContextValue = {
    isFetchJob: boolean;
    fetchJob: (id: string) => void;
  }
  
  const JobContext = createContext<JobContextValue | undefined>(undefined);
  
  export const useOccasion = () => useContext(JobContext);
  
  const JobProvider = ({ children }: any) => {
    const [isFetchJob, setIsFetchJob] = useState(false);

    const fetchJob = async (id: string) => {
        setIsFetchJob(true)
        // await = ;
        setIsFetchJob(false) 
    }


    
  
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