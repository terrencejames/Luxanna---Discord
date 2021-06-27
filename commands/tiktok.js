const request = require('request');
var logger = require('winston');
const TikTokScraper = require('tiktok-scraper');
const truncate = require('truncate');

function getTikTokData(url, callback){
  unshortenUrl(url, callback);
}

function unshortenUrl(url, callback){
  logger.info("Attempting to unshorten TikTok url: " + url);
  if (url.includes("vm.tiktok")){
    request.get(url, (error, response, body) => {
      if (error) return;
      if (response.request.href != null)
        grabTikTokContents(response.request.href, callback);
    });
  }
  else{
    grabTikTokContents(url, callback);
  }
}

function grabTikTokContents(url, callback){
    logger.info("Retrieving contents from: " + url);
    var requestUrl = `https://www.tiktok.com/oembed?url=${url}`;
    request.get(requestUrl, async (error, response, body) => {
      if (error) return;
      let videoMeta = await getVideoMeta(url);
      logger.info("Video meta: " + videoMeta);
      let user = videoMeta != null ? await getUserData(videoMeta.authorMeta.name) : null;
      logger.info("User data: " + user);
      body = JSON.parse(body);
      logger.info("Body: " + body);
      let embed = {
        embed: {
                title: truncate(body.title, 50),
                description: body.title,
                author: {
                  name: body.author_name,
                  url: body.author_url,
                  icon_url: user != null ? user : ""
                },
                provider: {
                  name: body.provider_name,
                  url: body.provider_url
                },
                url: url,
                image: {
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
                    value: videoMeta != null ? videoMeta.playCount : "",
                    inline: false
                  },
                  {
                    name: "Likes",
                    value: videoMeta != null ? videoMeta.diggCount : "",
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
      logger.info(error);
  }
}

async function getUserData(username) {
    try {
        const user = await TikTokScraper.getUserProfileInfo(username, null);
        return user;
    } catch (error) {
      logger.info(error);
    }
}

module.exports.getTikTokData = getTikTokData;
