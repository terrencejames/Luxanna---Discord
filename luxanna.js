
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var riot = require('./riot.js');
var fs = require("fs");
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
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'status':
                bot.sendMessage({
                    to: channelID,
                    message: 'Shining bright!'
                });
            break;
            case 'repeat':
                bot.sendMessage({
                    to: channelID,
                    message: args
                });
            break;
            case 'level':
                logger.info("Command: Level");
                var slevel = riot.summonerLevel(args, function(level){
                    bot.sendMessage({
                        to: channelID,
                        message: level.summonerLevel
                    });
                }); 
            break;
            case 'rank':
                var srank = riot.summonerRank(args, function(rank){
                    bot.sendMessage({
                        to: channelID,
                        message: `${rank[0].playerOrTeamName}'s Summoner's Rift 5x5 Solo Rank: ${rank[0].tier} ${rank[0].rank} ${rank[0].leaguePoints}LP`
                    });
                });
            break;
            case 'dark':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'darkR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "FADE!"
                });
            break;
            case 'light':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'lightR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "INCANDESCE!"
                });
            break;
            case 'nature':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'natureR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "KA-BLOOM!"
                });
            break;
            case 'water':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'waterR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "GEYSER!"
                });
            break;
            case 'mystic':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'mysticR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "MYSTIC SPIRAL!"
                });
            break;
            case 'fire':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'fireR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "INFERNO!"
                });
            break;
            case 'magma':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'magmaR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "LAVA FOUNTAIN!"
                });
            break;
            case 'ice':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'iceR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "FREEZE!"
                });
            break;
            case 'storm':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'stormR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "LIGHTNING BOLT!"
                });
            break;
            case 'air':
                bot.joinVoiceChannel(VCID, function(err, events) {
                    var audioFile = 'airR.oga';
                    playAudio(VCID, audioFile);
                });
                bot.sendMessage({
                    to: channelID,
                    message: "CYCLONE!"
                });
            break;

            // Just add any case commands if you want to..
         }
     }
});

function playAudio(channel, file) {
    bot.getAudioContext(VCID, function(err, stream) {
    if (err) return console.error(err);
    stream.on('error', console.log);
    fs.createReadStream(file).pipe(stream, {end: false});
    stream.on('done', function() {
        bot.leaveVoiceChannel(VCID);
    });
    });
}