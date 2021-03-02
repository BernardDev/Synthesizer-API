function formatSynthQuery(query) {
  let manufacturerQuery = {};
  let paginationQuery = {};
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
      specificationQuery[option] = query[option];
    }
  }
  for (const option of manufacturerOptions) {
    if (query.hasOwnProperty(option)) {
      manufacturerQuery[option] = query[option];
    }
  }
  for (const option of paginationOptions) {
    if (query.hasOwnProperty(option)) {
      paginationQuery[option] = query[option];
    }
  }

  return {
    specificationQuery: specificationQuery,
    manufacturerQuery: manufacturerQuery,
    paginationQuery: paginationQuery,
  };
}

module.exports = formatSynthQuery;
