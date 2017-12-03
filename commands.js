
const commands = {
	"google": "google",
	"img": "img",
	"ult": ult,
	"laugh": laugh,
	"status": status,
	"help": helpmsg,
	"info": info,
	"repeat": repeat,
	"conch": conch,
	"level": level,
	"rank": rank,
	"transform": transform
}

function helpmsg(){
	var result = "";
	for (var cmd in commands.keys()){
		result += `!${cmd}\n`;
	}
	return result;
}

module.exports = helpmsg