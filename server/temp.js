//       if (req.file) {
//         const file = dataUri(req).content;
// return uploader.upload(file).then((result) => {
//           const image = result.url;
//           return res.status(200).({message: 'good', data: {image}
//         });
//         }).catch((err) => res.status(400).json({
//           message: 'someting went wrong while processing your request',
//           data: {
//           err
//           }
//         })).then(
