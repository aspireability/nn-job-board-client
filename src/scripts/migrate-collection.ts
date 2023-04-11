import { DirectusInstance } from '../api/directusApi';

const fromEnv = new DirectusInstance('http://localhost:8055');
const toEnv = new DirectusInstance('https://aspire-ability-navajo-nation-job-board.directus.app/');
const collectionName = 'Jobs';

const migrateCollection = async (collectionName: string) => {
  const collection = await fromEnv.instance.collections.readOne(collectionName);
  const fields = await fromEnv.instance.fields.readMany(collectionName);
  console.log('Collection', collection);
  console.log('Fields', fields);

  await toEnv.instance.auth.static('vUa9KTBfMqvlZyARHnFge0U4-OpMRbNi');
  await toEnv.instance.collections.createOne({ ...collection, fields })
}

const run = async () => {
  await migrateCollection(collectionName)
}


run()
  .then(() => console.log('Done with migrate of ', collectionName))
  .catch((error) => console.log('Error with migrate of ', collectionName, error))