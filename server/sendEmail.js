require('dotenv').config();
const sgMail = require('@sendgrid/mail');

function sendEmailWithAPIkey(APIkey, email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: 'synthesizer.api@gmail.com', // Change to your verified sender
    subject: 'Synthesizer API": here is your API key!',
    // text: `here is your api-key: ${APIkey} text`,
    html: `Your API key is: ${APIkey} <br>
    Happy Exploring and thanks for supporting Synthesizer API!`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendEmailWithAPIkey;
