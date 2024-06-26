var riot = require('./commands/riot.js');
var google = require('./commands/google.js');
var conch = require('./commands/conch.js');
var elements = require('./commands/elements.js');
var text = require('./commands/sms.js');
var audio = require('./commands/playaudio.js');
var rapgod = require('./commands/rapgod.js');
var championgg = require('./commands/championgg.js');


const cmdList = {
	"google": google.googleWeb,
	"img": google.googleImage,
	//"ult": elements.ult,
	//"laugh": elements.laugh,
	"status": statusmsg,
	"help": helpmsg,
	//"info": info,
	//"repeat": repeat,
	"conch": conch.getConchResponse,
	//"level": riot.summonerLevel,
	//"rank": riot.summonerRank,
	//"transform": elements.transform,
	//"text": text.sendText,
	//"rapgod": rapgod.rapgod,
	//"bans": championgg.topFiveBans,
	//"whocounters": championgg.findCounter,
	//"contacts": text.getContacts,
	"yt": google.googleYoutube,
	"ai": google.googleGemini
}

function helpmsg(args, callback){
	var result = "Commands: \n";
	for (var cmd in cmdList){
		result += `!${cmd}\n`;
	}
	callback(`\`\`\`${result}\`\`\``);
}

function statusmsg(args, callback){
	callback("Shining bright!")
}
module.exports = {helpmsg, statusmsg, cmdList}
