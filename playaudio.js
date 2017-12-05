var fs = require("fs");

function playAudio(bot, VCID, audio) {
    bot.joinVoiceChannel(VCID, function(err, events) {
        bot.getAudioContext(VCID, function(err, stream) {
        if (err) return console.error(err);
        stream.on('error', console.log);
        fs.createReadStream(audio).pipe(stream, {end: false});
        stream.on('done', function() {
            bot.leaveVoiceChannel(VCID);
        });
        });
    });
}

module.exports.playAudio = playAudio;