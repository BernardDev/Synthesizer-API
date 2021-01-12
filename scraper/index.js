const fs = require('fs');
const jsdom = require('jsdom');
const axios = require('axios');
const {JSDOM} = jsdom;

async function director(dom) {
  const title = getTitle(dom);
  const image = getImage(dom);
  const val = getSpecVal(dom);
  const key = getSpecKey(dom);
  const specs = createKeyValuePairSpecs(val, key);
  return {
    title,
    specs,
    image,
  };
}

async function fetchSynths(urls) {
  // 2. fetches all indiviual synth pages according to
  // content of the url array
  const promises = urls.map((url) => {
    // 3. look at fetch
    return fetch(url);
  });
  // 5. resolves all caught promises
  const data = await Promise.all(promises);
  // 6. writes all to json
  writeToFile(data);
}

async function fetch(url) {
  const res = await axios.get(url);
  const dom = new JSDOM(res.data);
  const synthData = director(dom);
  // 4. contains all data from indiviual synth page
  return synthData;
}

// we need to make fetchSynth take in a parameter
// from which the variables created by another function\
// this function should scrape all url's that are found on page 7
// write a function that scrapes all synth page url found on
// synthfinder page 7

// http://www.vintagesynth.com/synthfinder?field_year_value%5Bmin%5D=&field_year_value%5Bmax%5D=&page=7
// http://www.vintagesynth.com/synthfinder?field_year_value%5Bmin%5D=&field_year_value%5Bmax%5D=&page=8

function getTitle(dom) {
  const title = dom.window.document.querySelector('.vs-synth-title')
    .textContent;
  return title;
}

// --------
function createPageUrl() {
  let page = 7;
  // 7, 8, 9
  let url = `http://www.vintagesynth.com/synthfinder?field_year_value%5Bmin%5D=&field_year_value%5Bmax%5D=&page=${page}`;
  return url;
  // here we create an url for a indiviual roland synth
}

async function fetchUrlOnPage7() {
  const pageUrl = createPageUrl();
  // console.log(pageUrl);
  const res = await axios.get(pageUrl);
  const dom = new JSDOM(res.data);
  // console.log(dom);
  const elements = Array.from(
    dom.window.document.querySelectorAll('.views-field-title')
  );

  const links = elements.map((element) => {
    return element.querySelector('a').href;
  });
  // console.log(links);

  const rolandLinks = links.filter((link) => {
    // console.log(link.includes('roland') || link.includes('Roland'), link);
    return link.includes('roland') || link.includes('Roland');
  });

  console.log(rolandLinks);
  // const url = temp.querySelector('a').href;
  // console.log(url);
}

fetchUrlOnPage7();

// function getPageUrls() {

//   // here we select a indiviual link of a roland synth on the page
// }

// --------

function getImage(dom) {
  const image = dom.window.document.querySelector(
    '.field--name-field-image-er'
  );
  const url = image.querySelector('img').src;
  return url;
}

function getSpecVal(dom) {
  const specVal = dom.window.document.querySelectorAll('.specification-value');
  const specVal_text = Array.from(specVal).map((spec) => {
    return spec.textContent;
  });
  return specVal_text;
}

function getSpecKey(dom) {
  const specKey = dom.window.document.querySelectorAll('.specification-term');
  let specKey_text = Array.from(specKey).map((spec) => {
    return spec.textContent;
  });
  const specKey_text_new = specKey_text.map((key) => {
    return key.slice(0, -3);
  });
  return specKey_text_new;
}

function createKeyValuePairSpecs(key, val) {
  var KeyValuePairSpecs = {};
  key.forEach(function (obj, index) {
    KeyValuePairSpecs[val[index]] = obj;
  });

  return KeyValuePairSpecs;
}

function writeToFile(data) {
  const date = new Date();
  fs.writeFileSync(
    `./store_${date.getMinutes()}_${date.getHours()}_${date.getDate()}.json`,
    JSON.stringify(data)
  );
}

// 1. executes fetching indiviual synth pages
// fetchSynths([
//   'http://www.vintagesynth.com/roland/sh101.php',
//   'http://www.vintagesynth.com/roland/cr78.php',
// ]);
