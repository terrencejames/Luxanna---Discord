var audio = require('./playaudio.js');

function rapgod(args, callback, bot, VCID){
	audio.playAudio(bot, VCID, "rapgod.mp3");
	callback()
}

module.exports.rapgod = rapgod;