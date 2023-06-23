
// Send Email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wrp.prajay@gmail.com',
    pass: 'yukekqevuxnaldsl'
  }
});

var mailOptions = {
  from: 'wrp.prajay@gmail.com',
  to: 'krishb1925@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
