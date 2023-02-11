const fetch = require('node-fetch');

const url = 'https://api.sendinblue.com/v3/smtp/email';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'api-key': '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'
  },
  body: JSON.stringify({
    sender: {name: 'CastBell', email: 'mukisageophrey@gmail.com'},
    to: [{email: 'mukisa.geofrey@gmail.com', name: 'Henry tongo'}],
    params: {FIRSTNAME: 'Geophrey'},
    textContent: 'I hate you so muc',
    htmlContent: '<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>',
    subject: 'New Talent submitted'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));