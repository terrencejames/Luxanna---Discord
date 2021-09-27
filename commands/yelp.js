'use strict';
var auth = require('./../auth.json');
var logger = require('winston');
const yelp = require('yelp-fusion');
var Url = require('url-parse');
const client = yelp.client(auth.yelp_key);

function getBusinessId(url) {
  logger.info(url);
  var urlObj = new Url(url);

  // Url pathname will be in form /biz/id/
  // Remove trailing slashes, which will turn it into /biz/id
  logger.info(urlObj);
  let pathName = urlObj.pathname.replace(/\/$/, "");

  //Now, remove /p/ to extract just the shortCode
  logger.info(pathName);
  if (pathName.substr(0, 5) === "/biz/"){
    let businessId = pathName.substr(5);
    console.log(businessId);
    return businessId;
  }
  return "";
}

function getYelpInfo(url, callback) {
  let businessId = getBusinessId(url);
  client.business(businessId).then(response => {
    let body = response.jsonBody;
    let categories = "";
    body.categories.forEach(category => categories += category.title + ", ");
    let embed = {
      embed: {
              title: body.name,
              description: categories,
              url: body.url,
              image: {
                url: body.image_url
              },
              color: 0xC41200,
              footer: {
                text: "Yelp"
              },
              fields: [
                {
                  name: "Stars",
                  value: body.rating.toString(),
                  inline: false
                },
                {
                  name: "Reviews",
                  value: body.review_count,
                  inline: false
                },
                {
                  name: "Location",
                  value: body.location.display_address.join(","),
                  inline: false
                },
                {
                  name: "Price",
                  value: body.price,
                  inline: false
                }
              ]
          }
        };
    console.log(embed);
    callback(embed);
    }).catch(e => {
    console.log(e);
  });
}

module.exports.getYelpInfo = getYelpInfo;
