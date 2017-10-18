const request = require('request');
var auth = require('./auth.json');


var summoner = {};	
var summonerId;
// var summonerName;
// var summonerURL = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/
// 							${summonerName}?api_key=${auth.riot_key}`;
// const leagueURL = `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/
//							${summonerId}?api_key=${auth.riot_key}`

var summoner = {
	getSummonerId: function(name, callback) {
		var summonerURL = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${auth.riot_key}`;
		request.get(summonerURL, (error, response, body) => {
			let json = JSON.parse(body);
			console.log(json.id);
			callback(json.id);
		});

	},
	summonerLevel: function(name, callback) {
		var summonerURL = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${auth.riot_key}`;
		request.get(summonerURL, (error, response, body) => {
			let json = JSON.parse(body);
			console.log(json);
			return callback(json);
		});

	//return `Summoner name: ${name}`;
	},
	summonerRank: function(name, callback){
		//var summonerURL = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${auth.riot_key}`;
		// var leagueURL = `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=${auth.riot_key}`

		// console.log("nullid");
		// var saveid = function(id){
		// 	summonerId = id;
		// };
		// module.exports.summonerLevel(name, function(result){
		// 	console.log("result is");
		// 	console.log(result);
		// 	summonerId = result.id;
		// });
		module.exports.getSummonerId(name, function(id) {
			var leagueURL = `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/${id}?api_key=${auth.riot_key}`;
			request.get(leagueURL, (error, response, body) => {
				let json = JSON.parse(body);
				console.log(json);
				return callback(json);//name = json.name;
			});
		});
			//console.log(summonerId);
		

		// request.get(leagueURL, (error, response, body) => {
		// 	let json = JSON.parse(body);
		// 	return callback(json);//name = json.name;
		// });

	}
};
module.exports = summoner;