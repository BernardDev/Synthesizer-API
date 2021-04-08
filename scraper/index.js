const fs = require('fs');
const jsdom = require('jsdom');
const axios = require('axios');
const {JSDOM} = jsdom;
const download = require('image-downloader');
const synths = require('./data/store_dateInt.json');

// const synth = require('../server/models/synth');

// const manufacturers = require('./data/manufacturers.json');

// ----------------------------------------------------------------------------------
// --- LOWERCASE ALL SPEC KEYS

// map/forEach over every synth from the store.json
// map/forEach over every specs attribute
// target the first letter of each specs object key
// transform the first letter to lowercase
// set the old object keys specs to be equal to the new object keys specs
// return all specs of individual synths
// return all synths

// ----------------------------------------------------------------------
// LATEST APPROACH

let testObject = [
  {
    title: 'Access Virus A',
    specs: {
      Polyphony: '12 voices',
      Oscillators:
        '2 Osc per voice plus 1 Sub-Osc: Sine, tri, saw, variable width pulse, oscillator sync. 1 FM Mode: 64 digital FM spectral waveforms.',
      LFO:
        '2 per voice with tri, saw down, square, sample/hold, sample/glide and more',
      Filter:
        '2 independent resonant filters; lowpass, hipass, bandpass, band reject, parallel, split & 2 serial modes with up to 36dB/voice (6-poles), overdrive/saturation.',
      VCA: '2 ADSTR envelopes per voice',
      ModMatrix: '3 Sources, 6 Destinations',
      Effects:
        'Up to 22 simultaneous effects: 4 Chorus effects, Global Reverb/Delay, Vocoder',
      Keyboard: 'None',
      Memory: '256 ROM patches, 256 RAM patches, 128 multi RAM patches',
      Control: 'MIDI (16 multitimbral parts)',
      'Date Produced': '1997 - 1999',
    },
    image:
      'http://www.vintagesynth.com/sites/default/files/2017-05/access_virus.jpg',
    manufacturer: 'Acces',
  },
];

testObject.map((synth) => {
  for (let key in synth.specs) {
    const test = key.toLowerCase();
    // console.log(test);
  }
});

// ----------------------------------------------------------------------
// MAPPING OVER KEYS IN OBJECTS, MAPPING OVER NESTED KEYS IN OBJECTS

// function lower(obj) {
//   for (var prop in obj) {
//     if (typeof obj[prop] === 'string') {
//       Object.keys(obj[prop]) = obj[prop].toLowerCase();
//       // obj[prop] = obj[prop].toLowerCase();
//     }
//     if (typeof obj[prop] === 'object') {
//       lower(obj[prop]);
//     }
//   }
//   return obj;
// }

// console.log(lower(synths));

// ----------------------------------------------------------------------

// OWN APPROACH 2

// let obj = {};
// synths.forEach((synth) => {
//   obj[synth.specs] = synth.specs;
// });

// console.log(obj);

// function specsToLowercase(synths) {
//   const end = synths.map((synth) => {
//     return {specs: {...synth.specs}};
//   });
//   return end;
// }

// ----------------------------------------------------------------------

// TESTING IN SMALLER SCOPE

// let testObject = {
//   name: 'bernard',
//   adress: {
//     Street: 'homestreet',
//     Number: 34,
//   },
// };

// let pop = Object.keys(testObject.adress);
// let hal = pop.map((po) => {
//   return po.charAt(0).toLowerCase();
// });
// console.log(hal, 'is hal');

// ----------------------------------------------------------------------
// OTHER EXAMPLES

// var key,
//   keys = Object.keys(result);
// var n = keys.length;
// var newobj = {};
// while (n--) {
//   key = keys[n];
//   newobj[key.toLowerCase()] = result[key];
// }

// console.log(newobj, 'hellow');
// writeToFile(result);

// let myObj = {
//   foo0: 'test',
//   _foo1: 'test',
//   _foo2: 'test',
//   foo3: 'test',
// };

// let result = Object.keys(myObj).filter((v) => v.startsWith('_'));
// console.log(result);

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// ----------------------------------------------------------
// --- RETURN DATA FOR TABLE SYNTH

// console.log(synths);

// function testingFunction(synths) {
//   const result = synths.map((synth) => {
//     // return synth.title;
//     // return {...synth};
//     return {
//       title: synth.title,
//       img: synth.image,
//       manufacturer: synth.manufacturer,
//     };
//   });
//   return result;
// }

// const result = testingFunction(synths);
// console.log(result);

// writeToFile(result);

// manufacturer (id)
// synth (id)

// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// --- PARSE DATA TYPES: YEAR

// const dataChanged = synths.map((synth) => {
//   if (!synth.specs['Date Produced']) {
//     // console.log(synth);
//     return synth;
//   } else {
//     let DateProduced = synth.specs['Date Produced'];
//     delete synth.specs['Date Produced'];
//     return {
//       ...synth,
//       specs: {
//         ...synth.specs,
//         DateProduced: parseInt(DateProduced.match(/\d+/)[0]),
//       },
//     };
//   }
// });

// writeToFile(dataChanged);

// console.log(dataChanged);

// ----------------------------------------------------------------------------------
// --- ADDING MANUFACTURER TO JSON STORE

function matchManufacturer(synth) {
  const title = synth.title;
  const match = manufacturers.find((m) => {
    return title.includes(m);
  });
  return {...synth, manufacturer: match};
}

function insertSynth(synths) {
  const matchesAndSynths = synths.map((synth) => {
    const matchSynth = matchManufacturer(synth);
    return matchSynth;
  });
  return matchesAndSynths;
}
// const result = insertSynth(synths);
// writeToFile(result);

// ----------------------------------------------------------------------------------
// --- DOWNLOAD EXECUTION

function startDownloadingFromUrl() {
  const imgUrls = objects.map((object) => {
    return object.image;
  });
  downloadImgFromJson(download, imgUrls);
}

function downloadImgFromJson(download, imgUrls) {
  imgUrls.forEach((url) => {
    const options = {
      url: url,
      dest:
        '/Users/Bernard/Desktop/coaching/program/sprint 3 - api/roland-api/scraper/data/img',
    };
    download
      .image(options)
      .then(({filename}) => {
        console.log('Saved to', filename);
      })
      .catch((err) => console.error(err));
  });
}

// startDownloadingFromUrl();

// ----------------------------
// --- MAIN EXECUTION

function createPageUrl() {
  let page = 15;
  let url = `http://www.vintagesynth.com/synthfinder?field_year_value%5Bmin%5D=&field_year_value%5Bmax%5D=&page=${page}`;
  return url;
  // 7, 8, 9
}

async function fetchSynths(rolandUrls) {
  const promises = rolandUrls.map((rolandUrl) => {
    return fetchSynth(rolandUrl);
  });
  const data = await Promise.all(promises);
  writeToFile(data);
}

async function fetchSynth(url) {
  const dom = await reqAndParse(url);
  if (dom) {
    const synthData = director(dom);
    return synthData;
  } else {
    return {};
  }
}

async function reqAndParse(url) {
  try {
    const res = await axios.get(url);
    const dom = new JSDOM(res.data);
    return dom;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function fetchUrlOnPage() {
  const url = createPageUrl();
  const dom = await reqAndParse(url);
  let rolandUrls = getRolandSynthUrls(dom);
  const rolandUrlsFull = rolandUrls.map((rolandUrl) => {
    return (rolandUrl = `http://www.vintagesynth.com${rolandUrl}`);
  });
  fetchSynths(rolandUrlsFull); // array of all synth page urls
}

// ----------------------------------------------------------------------------------

function writeToFile(data) {
  const date = new Date();
  fs.writeFileSync(
    `./store_${date.getMinutes()}_${date.getHours()}_${date.getDate()}.json`,
    JSON.stringify(data)
  );
}

// fetchUrlOnPage();

// ----------------------------------------------------------------------------------

function getRolandSynthUrls(dom) {
  const elements = Array.from(
    dom.window.document.querySelectorAll('.views-field-title')
  );
  const links = elements.map((element) => {
    return element.querySelector('a').href;
  });
  return links;
}

// --------

async function director(dom) {
  const title = getTitleSynth(dom);
  const image = getImageSynth(dom);
  const val = getSpecValSynth(dom);
  const key = getSpecKeySynth(dom);
  const specs = createSpecs(val, key);
  return {
    title,
    specs,
    image,
  };
}

function getTitleSynth(dom) {
  const title = dom.window.document.querySelector('.vs-synth-title')
    .textContent;
  return title;
}

function getImageSynth(dom) {
  const image = dom.window.document.querySelector(
    '.field--name-field-image-er'
  );
  const url = image.querySelector('img').src;
  return `http://www.vintagesynth.com${url}`;
}

function getSpecValSynth(dom) {
  const specVal = dom.window.document.querySelectorAll('.specification-value');
  const specVal_text = Array.from(specVal).map((spec) => {
    return spec.textContent;
  });
  return specVal_text;
}

function getSpecKeySynth(dom) {
  const specKey = dom.window.document.querySelectorAll('.specification-term');
  let specKey_text = Array.from(specKey).map((spec) => {
    return spec.textContent;
  });
  const specKey_text_new = specKey_text.map((key) => {
    return key.slice(0, -3);
  });
  return specKey_text_new;
}

function createSpecs(key, val) {
  var KeyValuePairSpecs = {};
  key.forEach(function (obj, index) {
    KeyValuePairSpecs[val[index]] = obj;
  });
  return KeyValuePairSpecs;
}
