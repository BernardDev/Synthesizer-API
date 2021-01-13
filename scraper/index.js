const fs = require('fs');
const jsdom = require('jsdom');
const axios = require('axios');
const {JSDOM} = jsdom;
const download = require('image-downloader');
const synths = require('./data/store.json');
const manufacturers = require('./data/manufacturers.json');

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

const result = insertSynth(synths);
writeToFile(result);

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
