import axios from 'axios';
import { request } from 'http';
import token from './airtableApiToken';

const config = {
  baseUrl: 'https://api.airtable.com/v0/appNJFmnlv2q3EbOO',
  headers: { Authorization: `Bearer ${token}` }
};



export const get = async (path: string): Promise<any> => {
  const response = await axios.get(encodeURIComponent(path), config)
  return response;
}