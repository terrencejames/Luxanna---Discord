const conchresponses = ['Maybe someday.', 'Nothing.', 'Neither.', 'I don\'t think so.', 
                            'No.', 'Yes.', 'Try asking again.']

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getConchResponse(args, callback) {
	callback(conchresponses[getRandomIntInclusive(0, 6)])
}

module.exports.getConchResponse = getConchResponse;