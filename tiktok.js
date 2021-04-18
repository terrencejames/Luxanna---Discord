const request = require('request');
const TikTokScraper = require('tiktok-scraper');

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
    request.get(requestUrl, async (error, response, body) => {
      if (error) return;
      let videoMeta = await getVideoMeta(url);
      let user = await getUserData(videoMeta.authorMeta.name);
      body = JSON.parse(body);
      console.log(body);
      let embed = {
        embed: {
                title: body.title,
                description: body.title,
                author: {
                  name: body.author_name,
                  url: body.author_url,
                  icon_url: user.user.avatarThumb
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
                color: 0x000000,
                footer: {
                  text: "TikTok"
                },
                fields: [
                  {
                    name: "Plays",
                    value: videoMeta.playCount,
                    inline: false
                  },
                  {
                    name: "Likes",
                    value: videoMeta.diggCount,
                    inline: false
                  }
                ]
            }
      };
      console.log(embed);
      callback(embed);
    });
}

async function getVideoMeta(url){
  try {
    const videoData = await TikTokScraper.getVideoMeta(url, null);
    return videoData.collector[0];
    } catch (error) {
  console.log(error);
  }
}

async function getUserData(username) {
    try {
        const user = await TikTokScraper.getUserProfileInfo(username, null);
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports.getTikTokData = getTikTokData;
