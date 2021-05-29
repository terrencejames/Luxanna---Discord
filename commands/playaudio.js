var fs = require("fs");

function playAudio(bot, VCID, audio) {
    console.log("Playing audio.");
    bot.joinVoiceChannel(VCID, function(err, events) {
        console.log("Joining voice channel.");
        if (err) return console.error(err);
        bot.getAudioContext(VCID, function(err, stream) {
            console.log("Retrieving audio context.");
            if (err) return console.error(err);
            stream.on('error', console.log);
            console.log("Creating read stream.");
            fs.createReadStream(audio).pipe(stream, {end: false});
            console.log("Done with read stream.");
            stream.on('done', function() {
                console.log("Done, leaving voice channel.");
                bot.leaveVoiceChannel(VCID);
            });
        });
    });
}

module.exports.playAudio = playAudio;
