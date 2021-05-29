var audio = require('./playaudio.js');

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

var activeElement = 'light';

var elementActions = {
    audio: "",

    ult: function(args, callback, bot, VCID) {
        elementActions.audio = `${activeElement}R.oga`;
        audio.playAudio(bot, VCID, elementActions.audio)
        callback(elements[activeElement]);
    },

    laugh: function(args, callback, bot, VCID){
        elementActions.audio = `${activeElement}Laugh.oga`;
        audio.playAudio(bot, VCID, elementActions.audio)
        callback("Hahaha!");

    },

    transform: function(args, callback, bot, VCID){
        if (args in elements){
            elementActions.audio = `${args}Transform.oga`;
            activeElement = args;
            audio.playAudio(bot, VCID, elementActions.audio)
            callback(transformText[args]);
        }
        else
            callback("Not a valid element!")

    }
};

module.exports = elementActions;
