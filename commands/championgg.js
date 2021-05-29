const request = require('request-promise');
const lol_champs = require('./lol_champs.json')[0]["data"];
var auth = require('./../auth.json');

const positions = {
  top: 'TOP',
  mid: 'MIDDLE',
  middle: 'MIDDLE',
  jungle: 'JUNGLE',
  jungler: 'JUNGLE',
  jg: 'JUNGLE',
  bot: 'DUO_CARRY',
  adc: 'DUO_CARRY',
  support: 'Support',
  sup: 'Support',
  supp: 'Support'
};

//var riot_url = `https://na1.api.riotgames.com/lol/static-data/v3/champions/${id}?locale=en_US&api_key=${auth.riot_key}`;

var championgg = {
	topFiveBans: function(args, callback){
		ids = []
		championgg_url = `http://api.champion.gg/v2/champions?sort=banRate-desc&limit=5&api_key=${auth.championgg_token}`;
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

	findCounter: function(args, callback){
		var name = args[0].toLowerCase();
		var role = args[1];
		var id = championgg.getChampionIdFromName(name);
		if (id == -1)
			return callback(`\` Error: Invalid champion name: ${name} \``)
		if (!(role in positions))
			return callback(`\` Error: Invalid role name: ${role} \``)
		var champion_name = championgg.getChampionNameFromId(id);
		var matchup = positions[role];
		championgg_url = `http://api.champion.gg/v2/champions/${id}/${matchup}/matchups?limit=150&api_key=${auth.championgg_token}`;
		return request.get(championgg_url)
		.then(function (response){
			let json = JSON.parse(response);
			return championgg.populateCounters(id, json);
		})
		.then(counters => {
			console.log(counters);
			results = `Top 5 Counters for ${champion_name} (Data still needs to account for troll games): \n`;
			for (var i = 0; i < 5; i++){
				results += `\n ${i+1}. ${championgg.getChampionNameFromId(counters[i][0])}`;
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
	populateCounters: function(id, json){
		counters = []
		for (var i = 0; i < json.length; i++){
			if (json[i]["_id"]["champ1_id"] == id){
				counter_id = json[i]["_id"]["champ2_id"];
				counter = "champ2";
			}
			else{
				counter_id = json[i]["_id"]["champ1_id"];
				counter = "champ1";
			}
			var counterWinRate = json[i][counter]["winrate"];
			counters.push([counter_id, counterWinRate])
		}
		counters.sort(function(a,b){
			return a[1] < b[1] ? 1 : -1;
		});
		return counters;
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
	getChampionIdFromName: function(name){
		var champion_names = Object.keys(lol_champs);
		for (var i = 0; i < champion_names.length; i++){
			champ = lol_champs[champion_names[i]];
			if (champ["name"].toLowerCase() == name)
				return champ["id"];
		}
		return -1;
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
