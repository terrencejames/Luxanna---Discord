
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var riot = require('./riot.js');
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
            // Just add any case commands if you want to..
         }
     }
});