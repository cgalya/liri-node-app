var keys = require("./keys.js");
var twitterKeys = keys.twitterKeys;


var spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");

var command = process.argv[2];

switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}


function myTweets() {
  var Twitter = require("twitter");
  var client = new Twitter(twitterKeys);
  var params = {
    screen_name: "KnowNotJonSnow",
    count: 20
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      return console.log(error);
    } else {
      for (var i = 0; i < tweets.length; i++); {
        console.log(tweets[i].text);
      }
    }
  });
}

function spotifyThisSong() {

}

function movieThis() {

}

function doWhatItSays() {

}
