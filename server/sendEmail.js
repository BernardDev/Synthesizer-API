// Consider moving this to a folder called: services
// Be carefule though the sendEmailWithAPIKey is used in another file in the test
// So make sure to update the require statment there

require("dotenv").config();
const sgMail = require("@sendgrid/mail");

function sendEmailWithAPIkey(APIkey, email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: "synthesizer.api@gmail.com", // Change to your verified sender
    subject: "Synthesizer API: here is your API key!",
    html: `Your API key is: <b>${APIkey}</b> <br>
    Happy exploring and thanks for supporting Synthesizer API!`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = sendEmailWithAPIkey;
