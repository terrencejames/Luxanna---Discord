
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var riot = require('./riot.js');
var google = require('./google.js');
var fs = require("fs");


var VCID = auth.kappa_token;

const elements = {
    'air': 'CYCLONE!', 
    'dark': 'FADE!', 
    'magma': 'LAVA FOUNTAIN!', 
    'nature': 'KA-BLOOM!', 
    'light': 'INCANDESCE!', 
    'ice': 'FREEZE!', 
    'mystic': 'MYSTIC SPIRAL!',
    'fire': 'INFERNO!', 
    'storm': 'LIGHTNING BOLT!', 
    'water': 'GEYSER!'
};

const transformText = {
    'air': 'AIR!', 
    'dark': 'DARK!', 
    'magma': 'MAGMA!', 
    'nature': 'NATURE!', 
    'light': 'Light is but one of my weapons.', 
    'ice': 'ICE!', 
    'mystic': 'MYSTIC!',
    'fire': 'FIRE!', 
    'storm': 'There is a storm brewing!', 
    'water': 'WATER!'
};

const magicconchresponses = ['Maybe someday', 'Nothing.', 'Neither.', 'I don\'t think so.', 
                            'No.', 'Yes.', 'Try asking again.']

var activeElement = 'light';

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
    logger.info('Element: ' + activeElement);
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
        //console.log(elements.indexOf(cmd));
        // switch(true) {
        //     // !ping
        //     case 'status':
        //         bot.sendMessage({
        //             to: channelID,
        //             message: 'Shining bright!'
        //         });
        //     break;
        //     case 'repeat':
        //         bot.sendMessage({
        //             to: channelID,
        //             message: args
        //         });
        //     break;
        //     case 'level':
        //         logger.info("Command: Level");
        //         var slevel = riot.summonerLevel(args, function(level){
        //             bot.sendMessage({
        //                 to: channelID,
        //                 message: level.summonerLevel
        //             });
        //         }); 
        //     break;
        //     case 'rank':
        //         var srank = riot.summonerRank(args, function(rank){
        //             bot.sendMessage({
        //                 to: channelID,
        //                 message: `${rank[0].playerOrTeamName}'s Summoner's Rift 5x5 Solo Rank: ${rank[0].tier} ${rank[0].rank} ${rank[0].leaguePoints}LP`
        //             });
        //         });
        //     break;
        //     // case (cmd in elements):
        //     //     var audioFile = `${cmd}R.oga`
        //     //     var msg = elements[cmd];
        //     //     playAudioAndText(VCID, channelID, audioFile, msg);
        //     // break;
        //     case (transform.indexOf(cmd) > -1 && args in elements):
        //         var audioFile = `${args}Transform.oga`;
        //         var msg = transformText[args];
        //         activeElement = args;
        //         playAudioAndText(VCID, channelID, audioFile, msg);
        //     break;
        //     case (ult.indexOf(cmd) > -1):
        //         var audioFile = `${activeElement}R.oga`;
        //         var msg = elements[activeElement];
        //         playAudioAndText(VCID, channelID, audioFile, msg);
        //     break;
        //     case (laugh.indexOf(cmd) > -1):
        //         console.log("Laugh " + activeElement);
        //         var audioFile = `${activeElement}Laugh.oga`;
        //         var msg = "Hahaha!";
        //         playAudioAndText(VCID, channelID, audioFile, msg);
        //     break;
        //     case (testlink.indexOf(cmd) > -1):
        //         bot.sendMessage({
        //             to: channelID,
        //             message: `http://www.google.com/search?q=term&btnI`
        //         });
        //     break;
        //     case(google.indexOf(cmd) > -1):
        //         console.log(args);
        //         var IFLurl = createIFLurl(args);
        //         console.log(IFLurl);
        //         bot.sendMessage({
        //             to: channelID,
        //             message: IFLurl
        //         });
        //     break;

        //     default:
        //         bot.sendMessage({
        //             to: channelID,
        //             message: "Not a valid command!"
        //         });
        if (cmd == 'status'){
            bot.sendMessage({
                to: channelID,
                message: 'Shining bright!'
            });
        }

        else if (cmd == 'repeat'){
            bot.sendMessage({
                to: channelID,
                message: args
            });
        }

        else if (cmd == 'level'){
            logger.info("Command: Level");
            var slevel = riot.summonerLevel(args, function(level){
                bot.sendMessage({
                    to: channelID,
                    message: level.summonerLevel
                });
            });     
        }

        else if (cmd == 'rank'){
            var srank = riot.summonerRank(args, function(rank){
                bot.sendMessage({
                    to: channelID,
                    message: `${rank[0].playerOrTeamName}'s Summoner's Rift 5x5 Solo Rank: ${rank[0].tier} ${rank[0].rank} ${rank[0].leaguePoints}LP`
                });
            });
        }

        else if (cmd == 'transform' && args in elements){
            var audioFile = `${args}Transform.oga`;
            var msg = transformText[args];
            activeElement = args;
            playAudioAndText(VCID, channelID, audioFile, msg);
        }

        else if (cmd == 'ult'){
            var audioFile = `${activeElement}R.oga`;
            var msg = elements[activeElement];
            playAudioAndText(VCID, channelID, audioFile, msg);
        }

        else if (cmd == 'laugh'){
            console.log("Laugh " + activeElement);
            var audioFile = `${activeElement}Laugh.oga`;
            var msg = "Hahaha!";
            playAudioAndText(VCID, channelID, audioFile, msg);
        }


        else if (cmd == 'google') {
            console.log(args);
            var websearch = google.googleWeb(args, function(result){
                bot.sendMessage({
                    to: channelID,
                    message: result
                });
            });
        }

        else if (cmd == 'img') {
            console.log(args);
            var imgsearch = google.googleImage(args, function(result){
                bot.sendMessage({
                    to: channelID,
                    message: result
                });
            });
        }

        else if (cmd == 'magicconch'){
            if (args){
                bot.sendMessage({
                    to: channelID,
                    message: magicconchresponses[getRandomIntInclusive(0, 6)]
                });
            }
        }


        else {
            bot.sendMessage({
                to: channelID,
                message: "Not a valid command!"
            });
        }


            // Just add any case commands if you want to..
         
     }
});

function createIFLurl(args){
    var basestr = 'http://www.google.com/search?q=';
    for (var i = 0; i < args.length; i++){
        basestr += args[i] + '+';
    }
    basestr += '&btnI';
    return basestr;
    
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function playAudioAndText(VCID, TCID, audio, msg) {
    bot.joinVoiceChannel(VCID, function(err, events) {
        bot.getAudioContext(VCID, function(err, stream) {
        if (err) return console.error(err);
        stream.on('error', console.log);
        fs.createReadStream(audio).pipe(stream, {end: false});
        stream.on('done', function() {
            bot.leaveVoiceChannel(VCID);
            //fs.createReadStream(audio).pipe(stream, {end: false});
            // setTimeout( bot.leaveVoiceChannel(VCID), 300000);
        });
        });
    });
    bot.sendMessage({
        to: TCID,
        message: msg
    });
}