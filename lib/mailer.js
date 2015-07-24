var nodemailer = require('nodemailer');
var config = require('../config.json');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: config.mail
});

function sendConfirmation(user, token) {
  var url = 'http://localhost:8000/confirm/'+user+'/'+token;
  var mailOptions = {
    from: 'PDX Activist Newsletter ✔ <davejustishh@gmail.com>',
    to: user,
    subject: '✔ Verify signup for PDX Activist Newsletter ✔',
    text: 'visit: '+url+' to signup complete for PDX Activist Newsletter',
    html: '<p>Welcome to the PDX Activist Newsletter, all that\'s left is to'
          + ' <a href="'+url+'">confirm subscription</a>. Thanks!</p>'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) return console.log(err);
    return console.log('Message sent: ' + info.response);
  });
}

module.exports = {sendConfirmation: sendConfirmation}
