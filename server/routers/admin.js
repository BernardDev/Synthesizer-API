// const express = require('express');
// const yup = require('yup');
// const {suggestionsAll} = require('../queries/suggestionQueries');
// const validate = require('../validators/requestValidationMiddleware');

// const adminRoutes = new express.Router();

// adminRoutes.get(
//   '/admin',
//   validate(
//     yup
//       .object()
//       .shape({
//         limit: yup.number().integer().min(1).default(20),
//         offset: yup.number().integer().min(0).default(0),
//       })
//       .noUnknown(),
//     'query'
//   ),
//   async (req, res) => {
//     try {
//       const {limit, offset} = req.validatedQuery;
//       const result = await suggestionsAll(limit, offset);
//       if (result.rows.length === 0) {
//         return res.status(404).json({count: result.count, suggestions: []});
//       }
//       res.json({count: result.count, suggestions: result.rows});
//     } catch (error) {
//       console.error('ERROR: /admin', error);
//       res.status(400).json({message: 'Bad request', errors: error.errors});
//     }
//   }
// );

// module.exports = adminRoutes;
