const request = require('request-promise');
const lol_champs = require('./lol_champs.json')[0]["data"];
var auth = require('./auth.json');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
champnames = "";

//var riot_url = `https://na1.api.riotgames.com/lol/static-data/v3/champions/${id}?locale=en_US&api_key=${auth.riot_key}`;

var championgg = {
	topFiveBans: function(args, callback){
		body.data = []
		ids = []
		championgg_url = `http://api.champion.gg/v2/champions?sort=banRate-desc&limit=5&api_key=${auth.championgg_token}`
		return request.get(championgg_url)
		.then(function (body2){
			let json = JSON.parse(body2);
			for (var i = 0; i < 5; i++){
				id_and_role = [json[i]["_id"]["championId"], json[i]["_id"]["role"]];
				ids.push(id_and_role);
			}
			// console.log(ids);
			return ids;
		})
		.then(champids => {
			results = "Top 5 Bans for Platinum+: \n";
			for (var i = 0; i < champids.length; i++){
				results += `\n ${i+1}. ${championgg.getChampionNameFromId(champids[i][0])} (${champids[i][1]})`;
			}
			return `\`\`\`\n ${results} \n \`\`\``;
		})
		.then(response => {
			callback(response);
		})
	},
	getBansFromCache: function(ids, results){
		if (ids.length == 0)
			return results;
		if (!results)
			results = "Top 5 Bans for Platinum+: \n";
		for (var i = 0; i < ids.length; i++){

		}
	},
	getChampionNameFromId: function(id){
		//console.log(id);
		var champion_names = Object.keys(lol_champs);
		for (var i = 0; i < champion_names.length; i++){
			champ = lol_champs[champion_names[i]];
			if (champ["id"] == id)
				return champ["name"];
		} 
		return "Champ not in database!";
		
	},
	getBans: function(ids, results, count=1){
		//console.log("in get bans");
		console.log(ids);

		if (ids.length == 0){
			return results;
		}
		id = ids[0];
		//console.log("id is " + id);
		//var riot_url = `http://api.champion.gg/v2/champions/${id}/matchups?limit=1&api_key=${auth.championgg_token}`;
		var riot_url = `https://na1.api.riotgames.com/lol/static-data/v3/champions/${id}?locale=en_US&api_key=${auth.riot_key}`;
		//ids = ids.splice(1);
		return request.get(riot_url).then(function (body5){
			if (!results){
				results = "Top 5 Bans for Platinum+: \n";
			}
			//if (ids.length == 1)
			if (id){
				ids = ids.splice(1);
				let json = JSON.parse(body5);
				//console.log(json[0]["_id"]["role"]);
				results += `${count}. ${json["name"]}\n`;
				//results += `${count}. ${json[0]["_id"]["role"]}\n`;
				count++;
				//results += json[0]["_id"]["role"];
				//console.log(results);
				if (!ids){
					return results;
				}
				return championgg.getBans(ids, results, count++);
			}
			//console.log(results);
			return results;
		});
		
		// console.log("hi");
		// return results;
	}
};

//console.log(lol_champs);
//var champion_names = Object.keys(lol_champs);
//console.log(lol_champs[champion_names[0]]["name"]);
// var lmao = []
// console.log(lmao.length);
//console.log("test here");
//console.log(twoplus(2,3));
// console.log("starting");

// championgg.getBans([ 142, 142, 81, 238, 157 ]).then(contacts => {
// 	console.log(contacts);
// })


module.exports = championgg;