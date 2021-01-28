require('dotenv').config();
const sgMail = require('@sendgrid/mail');

function sendEmailWithAPIkey(APIkey, email) {
  // console.log('APIkey from send', APIkey);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: 'synthesizer.api@gmail.com', // Change to your verified sender
    subject: 'This is my first test mail!',
    // text: `here is your api-key: ${APIkey} text`,
    html: `here is your api-key: ${APIkey} html5`,
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
