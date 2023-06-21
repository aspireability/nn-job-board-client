// Instructions to use this scripts.js file.
// Do yarn first before using this js file. 
// The functions with 'one' in their name are for tested that function on one item in the collection. 
// The functions with 'all' in their name are the offical function that affects all items in the collection.
// Warning!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
// When using the functions with 'all' in their names, do one at a time. The terminal can't do for example: two at a time.
// So you should use .then in order to do the offical functions one by one 
// after one function is done running and the next function starts running.

// Import the Directus SDK

const { Directus } = require('@directus/sdk');

// Instantiate a new Directus client with your project URL and API token
const directus = new Directus('http://localhost:8055', {
  accessToken: 'itMvsEoYY25QT-Bu6zXzNleZunqEx6cD'
});


// Define the name of the collection you want to fetch rows from
const collectionName = 'Jobs';
// Call the getItems method on the client to fetch all the rows from the collection
async function itemsInJobs() {
	// GET DATA

	// We don't need to authenticate if the public role has access to some_public_collection.
	const publicData = await directus.items(collectionName).readByQuery({ sort: ['id'], limit: -1});

    console.log(publicData.data.length);
    
}

/// A Offical function that effects muitlple porperties in ALL items in a collection.
const replacementForALLBullets = async () => {
    const jobs = directus.items(collectionName);
  
    const data = await jobs.readByQuery({ sort: ['id'], limit: -1 });
    let i = 0;
    console.log('Bullets function for ALL Items has finished running task!!!!')

    for (const item of data.data) {
    console.log(`${i++}/${data.data.length}`)
      await jobs.updateOne(item.id, {
        Additional_Requirements: (item.Additional_Requirements || '').replaceAll(
          '•',
          '</p>\n<p>&bull;'
        ),
        Job_Description: (item.Job_Description || '').replaceAll(
            '•',
            '</p>\n<p>&bull;'
        ),
        Benefits: (item.Benefits || '').replaceAll(
            '•',
            '</p>\n<p>&bull;'
        ),
        Required_Documents: (item.Required_Documents || '').replaceAll(
            '•',
            '</p>\n<p>&bull;'
        ),
        Application_Instructions: (item.Application_Instructions || '').replaceAll(
            '•',
            '</p>\n<p>&bull;'
        ),
        Preferred_Educational_Experience: (item.Preferred_Educational_Experience || '').replaceAll(
            '•',
            '</p>\n<p>&bull;'
        ),
      });
    }
  };

// A Testing function that effects only ONE peroptery in ONE item in a collection.
const replacementForOneBullets = async () => {
    const job = directus.items(collectionName);
    const data = await job.readByQuery({ sort: ['id'], limit: -1 });
    let i = 0;

    for (const item of data.data.filter((item) => item.id === '381afae0-7afe-4aff-b34b-659d4cc2d14b')) {
        console(`${i++}/${data.data.length}`)
        await job.updateOne(item.id, {
            Additional_Requirements: (item.Additional_Requirements || '').replaceAll(
                '•',
                '</p>\n<p>&bull;'
            )
        })
    }
}

const re = /\d+\./;
const getMatches = (item) => {
  const matchIndexes = [];
  let m = item.match(re);
  let prevString = 0;
  while (m) {
    matchIndexes.push({
      content: m[0],
      index: m.index + prevString,
    });
    prevString += item.substring(0, m.index).length + m[0].length + 1;
    item = item.substring(m.index + m[0].length + 1);
    m = item.match(re);
  }
  return matchIndexes;
};
const replaceMatches = (item, matches) => {
  if (!matches.length) return item;
  let itemReplacement = '';
  for (let i = 0; i < matches.length; i++) {
    const curMatch = matches[i];
    const nextMatch = matches[i + 1];
    if (i === 0) {
      itemReplacement += `<p>${item.substring(
        0,
        curMatch.index
      )}</p>\n<ol>\n<li>${item.substring(
        curMatch.index + curMatch.content.length,
        nextMatch?.index || undefined
      )}`;
    } else {
      itemReplacement += `</li>\n<li>${item.substring(
        curMatch.index + curMatch.content.length,
        nextMatch?.index || undefined
      )}`;
    }
    if (i === matches.length - 1) {
      itemReplacement += `</li>\n</ol>`;
    }
  }
  return itemReplacement;
};
const processText = (item) => replaceMatches(item, getMatches(item));

// A Testing function that effects only ONE peroptery in ONE item in a collection.
const replacementForOneNumDot = async () => {
  const job = directus.items(collectionName);
  const data = await job.readByQuery({ sort: ['id'], limit: -1 });
  console.log('NumDot function for ONE Item has finished running task!!!!')
  for (const item of data.data.filter(
    (item) => item.id === 'ff8309b9-11bf-4f48-b02c-263b2c0d650a'
  )) {
    await job.updateOne(item.id, {
      Additional_Requirements: processText(item.Additional_Requirements || ''),
    });
  }
};

// A Offical function that effects muitlple porperties in ALL items in a collection.
const replacementForALLNumDot = async () => {
    const jobs = directus.items(collectionName);
  
    const data = await jobs.readByQuery({ sort: ['id'], limit: -1 });
    let i = 0;
    console.log('NumDot function for ALL Items has finished running task!!!!')

    for (const item of data.data) {
    console.log(`${i++}/${data.data.length}`)
      await jobs.updateOne(item.id, {
        Additional_Requirements: processText(item.Additional_Requirements || ''),
        Job_Description: processText(item.Job_Description || ''),
        Benefits: processText(item.Benefits || ''),
        Required_Documents: processText(item.Required_Documents || ''),
        Application_Instructions: processText(item.Application_Instructions || ''),
        Preferred_Educational_Experience: processText(item.Preferred_Educational_Experience || ''),
      });
    }
  };

// itemsInJobs();
// replacementForALLBullets();
// replacementForOneBullets();
// replacementForALLNumDot();
// replacementForOneNumDot();
itemsInJobs().then(() => replacementForALLBullets()).then(() => replacementForALLNumDot()).then(() => console.log('Done'))