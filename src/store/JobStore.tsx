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