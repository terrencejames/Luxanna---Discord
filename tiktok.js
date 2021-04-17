const request = require('request');

function getTikTokData(url, callback){
  unshortenUrl(url, callback);
}
function unshortenUrl(url, callback){
  request.get(url, (error, response, body) => {
    if (error) return;
    if (response.request.href != null)
      grabTikTokContents(response.request.href, callback);
  });
}

function grabTikTokContents(url, callback){
    var requestUrl = `https://www.tiktok.com/oembed?url=${url}`;
    request.get(requestUrl, (error, response, body) => {
      if (error) return;
      body = JSON.parse(body);
      console.log(body);
      let embed = {
        embed: {
                title: body.title,
                description: body.title,
                author: {
                  name: body.author_name,
                  url: body.author_url
                },
                provider: {
                  name: body.provider_name,
                  url: body.provider_url
                },
                url: url,
                thumbnail: {
                  url: body.thumbnail_url,
                  height: body.thumbnail_height,
                  width: body.thumbnail_width
                },
                color: 0x008000,
                footer: {
                  text: "TikTok"
                }
            }
      };
      console.log(embed);
      callback(embed);
    });
}

module.exports.getTikTokData = getTikTokData;
