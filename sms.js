var authen = require('./auth.json');
const nodemailer = require('nodemailer');

var mailOptions = {
  from: authen.email.login, // sender address
  to: '', // list of receivers
  subject: '', // Subject line
  text: '' // plain text body
};

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: authen.email.login,
        pass: authen.email.password
    }
});

function sendText(args, callback, {}, {}, user) {
   if (args[0] in authen.smscontacts){
   	   mailOptions.to = authen.smscontacts[args[0]]
   	   mailOptions.text = `${user} messaged you from Kappa Pride: ${args.slice(1).join(' ')}`
   	   transporter.sendMail(mailOptions, function (err, info) {
		   if(err){
		     console.log(err)
		   }
		   else{
		     console.log(info);
		     callback(`Successfully sent message: ${args.slice(1).join(' ')} to ${args[0]} from ${user}`)
		   }
   		});
   }
   else
   	callback(`Error: ${args[0]} is not in contacts list.`)
}

module.exports.sendText = sendText;