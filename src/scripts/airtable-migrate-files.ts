import fs from 'fs';
import csv from 'csv-parser';
import { DirectusInstance } from '../api/directusApi';
import FormData from 'form-data';
import { get } from 'lodash';

const apiUrl: string = 'https://aspire-ability-navajo-nation-job-board.directus.app';
// const apiUrl: string = 'http://localhost:8055';

const directus = new DirectusInstance(apiUrl);

const csvFilePath: string = 'src/scripts/Job-Import-Files.csv';

const importFile = async (fileName: string, url: string, jobId: string, recordId: string) => {
  // upload the file to directus
  const createdFile: any = await directus.instance.files.import({ url, data: { title: fileName }})

  console.log('created file', createdFile.id);

  // add the file to the job
  const patchResponse = await directus.patch('Jobs', jobId, {
    "Job_Description_Document_Upload": {
      "create": [
        {
          "Jobs_id": jobId,
          "directus_files_id": { 
            "id": createdFile.id
          }
        }
      ],
      "delete": [],
      "update": []
    }    
  })

  console.log('attached file to Job', jobId, patchResponse['Job_Description_Document_Upload']);
}

const importImages = async () => {

  const response = await directus.getMany('Jobs', { limit: -1, fields: ['id', 'Airtable_Record_Id'] });
  const jobsIdAndRecordIds = response.data;
  // console.log('jobsIdAndRecordIds', jobsIdAndRecordIds);

  const recordIdToJobId: any = {};
  jobsIdAndRecordIds.forEach((row: any) => {
    // console.log('map', row['Airtable_Record_Id'], row['id']);
    recordIdToJobId[row['Airtable_Record_Id']] = row['id'];
  });

  const fileInfos: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row: any) => { // { id?: string; file_url: string }      
      // const line = row['Job_Description_Document_Upload'];
      // const recordId = row['Airtable_Record_Id']
      const values = Object.values(row);
      const recordId: string = values[1] as string;
      const line: string = values[0] as string;
      // console.log('row', values, recordId, line);

      const regex = /^\"*(.+)(\(.+\)*)\"*/

      const jobId = recordIdToJobId[recordId];      

      if (!jobId) {
        throw Error('cant find job id for record id: '+recordId);
      }

      try {        

        if (line !== '') {
          const delimiter1 = ')",';
          const delimiter2 = '),';
          
          let files = line.split(delimiter1);
          if (files.length === 1) {
            files = line.split(delimiter2);
          }          

          // const fileInfos: any[] = [];
          files.forEach((file: string) => {
            const matches = file.match(regex);
            if (!matches) {
              console.error('**** no matches found', file, files)
            }
            else {
              const name = matches[1].replace('"', '').trim();
              const url = matches[2].replace('(', '').replace(')', '').replace('"', '');              

              fileInfos.push({ name, url, jobId, recordId});
            }          
          })

          console.log("line", recordId, '=>', files.length);
        }        
      }
      catch (e) {
        console.error('^^^^ Error parsing', recordId, '=>', e)
      }      
      
    })
    .on('end', async () => {
      try {
        console.log('about to import files', fileInfos.length);
    
        for (var i = 0; i < fileInfos.length; i++) {        
          const { name, url, jobId, recordId } = fileInfos[i];
          console.log('####', i, recordId, name, url);
          await importFile(name, url, jobId, recordId);
        }

        console.log('File uploads/updates completed for all rows.');
      }
      catch (error) {
        console.log(error)
      }      
    });    
}

const run = async () => {
  await importImages()
}

run()
  .then(() => console.log('Done'))
  .catch((error) => console.log('Error', error))