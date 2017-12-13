
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
    bot.setPresence({
        game:{
            name: "Rapgod"
        }
    });
});

bot.on("disconnect", function(err, code) {
    logger.info("Bot disconnected");
    logger.info("Error: " + err);
    logger.info("Code: " + code);
    bot.connect() //Auto reconnect
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
                if (result) {
                    bot.sendMessage({
                        to: channelID,
                        message: result,
                        typing: 1000
                    }, function(err, res){ 
                        if (err) {
                        console.log(err);
                        throw err; 
                        }
                    });
                }
            }, bot, VCID, user);
            bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: "goldogre:308029606013960192"
            }, function(err, res) {
                if (err) { 
                    console.log(err);
                    throw err; }
            });
        }

        else if (cmd == "dismiss"){
            if (userID == "81304855020314624"){
                console.log(bot.users);
                var serverID = bot.channels["152941706302455810"].guild_id;
                for (var userID in bot.users){
                    if (args[0].toLowerCase() == bot.users[userID].username.toLowerCase()){
                        console.log("found user")
                        var myID = userID;
                    }
                }
                console.log(myID);
                //var userID = bot.users[args[1]]
                //81514066266292224
                bot.sendMessage({
                    to: channelID,
                    message: `SEE YA ${args[0]}`,
                    typing: 1000
                }, function(err, res){ 
                    if (err) {
                    console.log(err);
                    throw err; 
                    }
                });
                bot.moveUserTo({
                    serverID: serverID,
                    userID: myID,
                    channelID: auth.testkappa_token
                })
            }
            else{
                bot.sendMessage({
                    to: channelID,
                    message: `\`Error: You are not my master, ${user}.\``,
                    typing: 1000
                });
            }
        }

        else {
            bot.sendMessage({
                to: channelID,
                message: "```Not a valid command! Try !help for a list of commands.```"
            });
            bot.addReaction({
            channelID: channelID,
            messageID: evt.d.id,
            reaction: "face:294574806815342593"
            }, function(err, res) {
                if (err) { 
                    console.log(err);
                    throw err; }
            });
        }
        



            // Just add any case commands if you want to..
         
     }
});

