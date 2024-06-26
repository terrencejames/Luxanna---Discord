const request = require('request');
var auth = require('./../auth.json');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(auth.gemini_api);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
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
	}, 

	googleGemini: async function(query, callback) {
		const prompt = query;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		var text = response.text();
		if (text.length > 1999) {
			text = text.slice(0, 1996) + "...";
		}
		return callback(text);
	}

};

module.exports = search;
