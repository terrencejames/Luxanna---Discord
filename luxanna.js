
var Eris = require('eris');
var logger = require('winston');
var auth = require('./auth.json');
var commands = require('./commands.js').cmdList;
var tiktok = require('./commands/tiktok.js');
var ig = require('./commands/instagram.js');
var yelp = require('./commands/yelp.js');
var VCID = auth.kappa_token;
var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
var fs = require("fs");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Eris(auth.bot_token);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    logger.info("Date: " + new Date(Date.now()).toString());
    bot.setPresence({
        game:{
            name: "ME BROKEN"
        }
    });
});

bot.on("disconnect", function(err, code) {
    logger.info("Bot disconnected");
    logger.info("Error: " + err);
    logger.info("Code: " + code);
    bot.connect() //Auto reconnect
});

bot.on('messageCreate', function (message) {
    if (message.content.match(regex) && message.content.includes("instagram")){
      logger.info("Embedding Instagram");
      ig.getIgPost(message.content, function(result){
        if (result){
          bot.createMessage(message.channel.id, result);
        }
      });
    }
    else if (message.content.match(regex) && message.content.includes("yelp")){
      logger.info("Embedding Yelp");
      yelp.getYelpInfo(message.content, function(result){
        logger.info("Sending Yelp embed");
        if (result){
          bot.createMessage(message.channel.id, result);
        }
      });
    }

    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        logger.info("Command: " + cmd);

        if (cmd in commands){
            commands[cmd](args, function(result){
              logger.info("Result: " + result);
                if (result) {
                    bot.createMessage(message.channel.id, result);
                }
            });
            bot.addMessageReaction(message.channel.id, message.id,
                ":peepoBlushCowboy:776066523025375252");
        }

        // else if (cmd == "dismiss"){
        //     if (userID == "81304855020314624"){
        //         console.log(bot.users);
        //         var serverID = bot.channels["152941706302455810"].guild_id;
        //         for (var userID in bot.users){
        //             if (args[0].toLowerCase() == bot.users[userID].username.toLowerCase()){
        //                 console.log("found user")
        //                 var myID = userID;
        //             }
        //         }
        //         console.log(myID);
        //         //var userID = bot.users[args[1]]
        //         //81514066266292224
        //         bot.sendMessage({
        //             to: channelID,
        //             message: `SEE YA ${args[0]}`,
        //             typing: 1000
        //         }, function(err, res){
        //             if (err) {
        //             console.log(err);
        //             throw err;
        //             }
        //         });
        //         bot.moveUserTo({
        //             serverID: serverID,
        //             userID: myID,
        //             channelID: auth.testkappa_token
        //         })
        //     }
        //     else{
        //         bot.sendMessage({
        //             to: channelID,
        //             message: `\`Error: You are not my master, ${user}.\``,
        //             typing: 1000
        //         });
        //     }
        //}

        else {
            bot.createMessage(message.channel.id,
                "```Not a valid command! Try !help for a list of commands.```");
            bot.addMessageReaction(message.channel.id, message.id,
                ":pensiveCowboy:770418781599039501");
        }
            // Just add any case commands if you want to..
     }
});

bot.on("voiceChannelJoin", (member, channel) => {
    // bot.joinVoiceChannel(channel.id).then((connection) => {
    //
    //   connection.on("speakingStart", (userID) => {
    //     console.log(userID);
    //
    //     if (connection.paused) {
    //       console.log("resume");
    //       connection.resume();
    //     }
    //     else {
    //       connection.play("./resources/audio/mysticLaugh.oga");
    //       connection.once("end", () => connection.stopPlaying());
    //     }
    //
    //   })
    //
    //   connection.on("speakingStop", (userID) => {
    //     console.log(userID);
    //
    //            if (connection.playing) {
    //       console.log("pause");
    //       connection.pause();
    //     }
    //   })
    //
    //   connection.on("error", (err) => {
    //     console.log(err);
    //   })
    //
    //   if (connection.playing) {
    //     console.log("Stop playing");
    //     connection.stopPlaying();
    //   }
    //
    //   // connection.on("ready", () => {
    //   //     console.log("hello2");
    //   //     connection.play("./resources/audio/iceLaugh.oga");
    //   // });
    // }).catch(err => console.log(err));
});

bot.connect();

module.exports = logger;
