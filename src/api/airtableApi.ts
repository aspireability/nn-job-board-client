import axios from 'axios';
import token from './airtableApiToken';

const baseUrl = 'https://api.airtable.com/v0/appNJFmnlv2q3EbOO/';

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const apiInstance = axios.create(config);


export const get = async (path: string): Promise<any> => {
  const response = await apiInstance.get(`${baseUrl}${encodeURI(path)}`, config)
  return response.data;
}