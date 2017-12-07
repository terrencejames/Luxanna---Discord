var riot = require('./riot.js');
var google = require('./google.js');
var conch = require('./conch.js');
var elements = require('./elements.js');
var text = require('./sms.js');
var audio = require('./playaudio.js');
var rapgod = require('./rapgod.js');
var championgg = require('./championgg.js');


const cmdList = {
	"google": google.googleWeb,
	"img": google.googleImage,
	"ult": elements.ult,
	"laugh": elements.laugh,
	"status": statusmsg,
	"help": helpmsg,
	//"info": info,
	//"repeat": repeat,
	"conch": conch.getConchResponse,
	"level": riot.summonerLevel,
	"rank": riot.summonerRank,
	"transform": elements.transform, 
	"text": text.sendText,
	"rapgod": rapgod.rapgod,
	"bans": championgg.topFiveBans,
	"whocounters": championgg.findCounter
}

function helpmsg(args, callback){
	var result = "Commands: \n";
	for (var cmd in cmdList){
		result += `!${cmd}\n`;
	}
	callback(result);
}

function statusmsg(args, callback){
	callback("Shining bright!")
}
module.exports = {helpmsg, statusmsg, cmdList}