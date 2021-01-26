function formatSynthQuery(query) {
  // console.log('query', query);
  let pagination = {};
  let manufacturerQuery = {};
  let specificationQuery = {};
  let manufacturerOptions = ['manufacturer'];
  let paginationOptions = ['limit', 'offset'];
  let specificationOptions = [
    'polyphony',
    'keyboard',
    'control',
    'yearProduced',
    'memory',
    'oscillators',
    'filter',
    'lfo',
    'effects',
  ];
  for (const option of specificationOptions) {
    if (query.hasOwnProperty(option)) {
      // console.log('option', option);
      specificationQuery[option] = query[option];
    }
  }
  for (const option of manufacturerOptions) {
    if (query.hasOwnProperty(option)) {
      // console.log('option', option);
      manufacturerQuery[option] = query[option];
    }
  }
  for (const option of paginationOptions) {
    if (query.hasOwnProperty(option)) {
      // console.log('option', option);
      // console.log(query[option]);
      pagination[option] = query[option];
    }
  }
  console.log('pagination', pagination);
  return {
    specificationQuery: specificationQuery,
    manufacturerQuery: manufacturerQuery,
    pagination: pagination,
  };
}

module.exports = formatSynthQuery;
