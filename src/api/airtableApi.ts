import axios from 'axios';
import token from './airtableApiToken';
import Airtable from 'airtable';

export const airtableApi = new Airtable({apiKey: token}).base('appNJFmnlv2q3EbOO');