var command = process.argv[2];
var args = process.argv;

switch (command) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong(args);
    break;
  case "movie-this":
    movieThis(args);
    break;
  case "do-what-it-says":
    doWhatItSays(args);
    break;
}


function myTweets() {
  var keys = require("./keys.js");
  var twitterKeys = keys.twitterKeys;
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
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    }
  });
}


function spotifyThisSong(args) {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: "6d3721a469fa4b7e9cc22b0c37b13758",
    secret: "59ab82245fea41d3b95d9e285cbfbf84"
  });
  var songTitle = "";

  if (args.length === 3) {
    songTitle = '"the sign"';
  } else if (args.length > 3) {
    for (var i = 3; i < args.length; i++) {
      if (i > 3 && i < args.length) {
        songTitle = songTitle + "+" + args[i];
      } else {
        songTitle += args[i];
      }
    }
  }
  spotify.search({
    type: 'track',
    query: songTitle
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      var songData = data.tracks.items[0];
      console.log("Song Name: " + songData.name);
      console.log("Artist: " + songData.artists[0].name);
      console.log("Preview Link: " + songData.preview_url)
      console.log("Album: " + songData.album.name)
    }
  });
}


function movieThis(args) {
  var request = require("request");
  var movieTitle = "";

  if (args.length === 3) {
    movieTitle = "Mr+Nobody";
  } else if (args.length > 3) {
    for (var i = 3; i < args.length; i++) {
      if (i > 3 && i < args.length) {
        movieTitle = movieTitle + "+" + args[i];
      } else {
        movieTitle += args[i];
      }
    }
  }

  var movieURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";
  console.log(movieURL);
  request(movieURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}


function doWhatItSays(args) {
  var fs = require("fs");
  //  var argArr = [];
  //  var arg2 = process.argv[2];
  //  var arg3 = process.argv[3];
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    for (var i = 0; i < dataArr.length; i++) {
      args.push(dataArr[i]);
    }
    if (args[2] === "spotify-this-song") {
      spotifyThisSong(args);
    }
  });
}
