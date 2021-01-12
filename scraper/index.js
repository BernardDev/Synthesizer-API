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
  // const writing = writeToFile(title, specs, image);
}

async function fetchSynths(urls) {
  const promises = urls.map((url) => {
    return fetch(url);
  });
  const data = await Promise.all(promises);
  writeToFile(data);
  // console.log(data, 'is data');
}

async function fetch(url) {
  const res = await axios.get(url);
  // console.log(Object.keys(res));
  const dom = new JSDOM(res.data);
  const synthData = director(dom);
  return synthData;
}

async function fetch2() {
  console.log('executed');
  let page = 7;
  // 7, 8, 9
  const synths = await axios.get(
    `'http://www.vintagesynth.com/synthfinder?field_year_value%5Bmin%5D=&field_year_value%5Bmax%5D=&page=${page}`
  );
  return new JSDOM(synths.data);
}

function getTitle(dom) {
  const title = dom.window.document.querySelector('.vs-synth-title')
    .textContent;
  return title;
}

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

// fetch('http://www.vintagesynth.com/roland/sh101.php');
// fetch('http://www.vintagesynth.com/roland/cr78.php');
fetchSynths([
  'http://www.vintagesynth.com/roland/sh101.php',
  'http://www.vintagesynth.com/roland/cr78.php',
]);
