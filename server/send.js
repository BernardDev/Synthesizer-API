require('dotenv').config();

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
javascript;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'bernardwittgen@hotmail.com', // Change to your recipient
  from: 'synthesizer.api@gmail.com', // Change to your verified sender
  subject: 'This is my first test mail!',
  text: 'this is just a message',
  html: '<strong>I am strong text</strong>',
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
