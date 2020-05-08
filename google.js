const request = require('request');
var auth = require('./auth.json');

var search = {
	googleWeb: function(query, callback) {
		var querystr = "";
		for (var i = 0; i < query.length; i++){
        	querystr += query[i] + '+';
    	}
		var url = `https://www.googleapis.com/customsearch/v1?q=${querystr}&cx=${auth.cse_token}&key=${auth.google_api}`;
		request.get(url, (error, response, body) => {
			let json = JSON.parse(body)
			return callback(json.items[0].link)
		});
	},

	googleImage: function(query, callback){
		var querystr = "";
		for (var i = 0; i < query.length; i++){
        	querystr += query[i] + '+';
    	}
		var url = `https://www.googleapis.com/customsearch/v1?q=${querystr}&cx=${auth.cse_token}&searchType=image&key=${auth.google_api}`;
		request.get(url, (error, response, body) => {
			let json = JSON.parse(body)
			return callback(json.items[0].link)
		});
	},

	googleYoutube: function(query, callback) {
		query.unshift("youtube");
		search.googleWeb(query, callback);
	}

};

module.exports = search;
