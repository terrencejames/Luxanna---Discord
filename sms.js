var auth = require('./auth.json');
const nodemailer = require('nodemailer');

var mailOptions = {
  from: auth.email.login, // sender address
  to: '', // list of receivers
  subject: '', // Subject line
  text: '' // plain text body
};

var transporter = nodemailer.createTransport({
 service: 'gmail',
 credentials: {
        user: auth.email.login,
        pass: auth.email.password
    }
});

function sendText(args, callback, {}, {}, user) {
   if (args[0] in auth.smscontacts){
   	   mailOptions.to = auth.smscontacts[args[0]]
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