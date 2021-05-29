var authen = require('./../auth.json');
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

var sms = {

  sendText: function(args, callback, {}, {}, user) {
     if (args[0].toLowerCase() in authen.smscontacts){
     	   mailOptions.to = authen.smscontacts[args[0].toLowerCase()]
     	   mailOptions.text = `DO NOT REPLY. ${user} messaged you from Kappa Pride: ${args.slice(1).join(' ')}`
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
  },
  getContacts: function(args, callback){
      var result = "Contacts: \n";
      for (var contact in authen.smscontacts){
        result += `${contact} \n`;
      }
      callback(`\`\`\`${result}\`\`\``);
  }
}

module.exports = sms;
