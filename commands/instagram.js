'use strict';
const Insta = require('scraper-instagram');
const InstaClient = new Insta();
var Url = require('url-parse');

function getIgShortcode(url) {
  var urlObj = new Url(url);

  // Url pathname will be in form /p/shortCode/
  // Remove trailing slashes, which will turn it into /p/shortCode
  let pathName = urlObj.pathname.replace(/\/$/, "");

  //Now, remove /p/ to extract just the shortCode
  if (pathName.substr(0, 3) === "/p/"){
    let shortCode = pathName.substr(3);
    console.log(shortCode);
    return shortCode;
  }
  return "";

}
function getIgPost(url, callback) {
  let shortCode = getIgShortcode(url);
  InstaClient.getPost(shortCode)
  	.then(body => {
      let embed = {
        embed: {
                title: "Post by " + body.author.name,
                description: body.caption,
                author: {
                  name: body.author.username,
                  url: body.author.link,
                  icon_url: body.author.pic
                },
                url: body.link,
                image: {
                  url: body.contents[0].type === 'photo' ? body.contents[0].url : ""
                },
                color: 13500530,
                footer: {
                  text: "Instagram"
                },

            }
      };
      console.log(embed);
      callback(embed);
    })
  	.catch(err => console.error(err));
}

module.exports.getIgPost = getIgPost;
