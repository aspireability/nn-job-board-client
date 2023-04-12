import fs from 'fs';
import csv from 'csv-parser';
import { DirectusInstance } from '../api/directusApi';
import FormData from 'form-data';

const apiUrl: string = 'https://aspire-ability-navajo-nation-job-board.directus.app/';

const directus = new DirectusInstance(apiUrl);

const csvFilePath: string = 'src/scripts/airtable-export.csv';

const uploadFIle = async () => {

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

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row: any) => { // { id?: string; file_url: string }
      const recordId = row['Record_Id']
      const dbId = recordIdToJobId[recordId];
      const line = row['Job Description Document (Upload)'];    
      const regex = /^\"*(.+)(\(.+\)*)\"*/

      try {
        if (dbId && line !== '') {
          const delimiter1 = ')",';
          const delimiter2 = '),';
          
          let files = line.split(delimiter1);
          if (files.length === 1) {
            files = line.split(delimiter2);
          }          

          const fileInfos: any[] = [];
          files.forEach((file: string) => {
            const matches = file.match(regex);
            if (!matches) {
              console.error('**** no matches found', file, files)
            }
            else {
              const name = matches[1].replace('"', '').trim();
              const url = matches[2].replace('(', '').replace(')', '').replace('"', '');

              // const updateData = {
              //   file: fs.createReadStream(url)
              // };
        
              // try {
              //   const result = await directus.instance.items('').update(id, updateData);
              //   console.log(result);
              // } catch (error) {
              //   console.error(error);
              // }

              fileInfos.push({ name, url });
            }          
          })

          console.log("line", recordId, '=>', files.length, fileInfos);
        }        
      }
      catch (e) {
        console.error('^^^^ Error parsing', recordId, '=>', e)
      }
      

      // console.log('row', recordId, '=>', recordIdToJobId[recordId], '=>', files);
      // console.log('row', recordId);

      // Extract the ID and file URL from the row
      // const id: string | undefined = row.id;
      // const fileUrl: string = row.file_url;

      // // Check if the row has an ID before sending a PUT request
      // if (id) {
      //   const updateData = {
      //     file: fs.createReadStream(fileUrl)
      //   };

      //   try {
      //     const result = await directus.items(endpoint).update(id, updateData);
      //     console.log(result);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // } else {
      //   const createData = {
      //     file: fs.createReadStream(fileUrl)
      //   };

      //   try {
      //     const result = await directus.items(endpoint).create(createData);
      //     console.log(result);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    })
    .on('end', () => {
      console.log('File uploads/updates completed for all rows.');
    });
}

const run = async () => {
  await importImages()
}

run()
  .then(() => console.log('Done'))
  .catch((error) => console.log('Error', error))