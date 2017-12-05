
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require('./commands.js').cmdList;
var VCID = auth.kappa_token;


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.bot_token,
   autorun: true,
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});


bot.on('voiceStateUpdate', function(event) {
    bot.sendMessage
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        console.log(cmd);

        if (cmd in commands){
            commands[cmd](args, function(result){
                bot.sendMessage({
                    to: channelID,
                    message: result
                });
            }, bot, VCID, user);
        }

        else {
            bot.sendMessage({
                to: channelID,
                message: "Not a valid command! Try !help for a list of commands."
            });
        }


            // Just add any case commands if you want to..
         
     }
});

