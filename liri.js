//save command line keyword to a variable
var command = process.argv[2];
var args = process.argv;

//switch case to determine which function to run based on which keyword was entered
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

//if my-tweets is entered
function myTweets() {
  //sets up append file
  var fs = require("fs");
  //gets twitter keys from keys.js
  var keys = require("./keys.js");
  var twitterKeys = keys.twitterKeys;
  var Twitter = require("twitter");
  var client = new Twitter(twitterKeys);
  //empty string for adding tweets to
  var tweetList = "";
  var params = {
    screen_name: "KnowNotJonSnow",
    count: 20
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      return console.log(error);
    } else {
      //loop through tweets and add them to empty string with line breaks between them
      for (var i = 0; i < tweets.length; i++) {
        if (i < tweets.length - 1) {
          tweetList += tweets[i].text + "\n";
        } else {
          tweetList += tweets[i].text;
        }
      }
      console.log("***************************************\n" + "My Tweets:\n" + tweetList + "\n***************************************");
      //add tweets to log.txt
      fs.appendFile("log.txt", "***************************************\n" + "My Tweets:\n" + tweetList + "\n***************************************\n", function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}


//if spotify-this-song is entered
function spotifyThisSong(args) {
  //sets up append file
  var fs = require("fs");
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: "6d3721a469fa4b7e9cc22b0c37b13758",
    secret: "59ab82245fea41d3b95d9e285cbfbf84"
  });
  //empty string for user's song choice
  var songTitle = "";
  //if no song is intered, default to "the sign"
  if (args.length === 3) {
    songTitle = "the sign";
  } else if (args.length > 3) {
    //loop through any command line arguments starting at index 3 and add them to songTitle
    for (var i = 3; i < args.length; i++) {
      if (i > 3 && i < args.length) {
        songTitle = songTitle + '+' + args[i];
      } else {
        songTitle += args[i];
      }
    }
  }

  spotify.search({
    type: 'track',
    query: '"' + songTitle + '"'
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      //retrieve song info from data object
      var songData = data.tracks.items[0];
      var songInfo = "Song Name: " + songData.name + "\n" + "Artist: " + songData.artists[0].name + "\n" + "Preview Link: " + songData.preview_url + "\n" + "Album: " + songData.album.name;
      console.log("***************************************\n" + "Song Info:\n" + songInfo + "\n***************************************");
      //add song info to log.txt
      fs.appendFile("log.txt", "***************************************\n" + "Song Info:\n" + songInfo + "\n***************************************\n", function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}


//if movie-this is entered
function movieThis(args) {
  //sets up append file
  var fs = require("fs");
  var request = require("request");
  //empty string for user's movie choice
  var movieTitle = "";
  //if no movie is entered, default to "mr. nobody"
  if (args.length === 3) {
    movieTitle = "Mr+Nobody";
  } else if (args.length > 3) {
    //loop through any command line arguments starting at index 3 and add them to movieTitle
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
      //retrieve movie info from response object
      var movieInfo = "Title: " + JSON.parse(body).Title + "\n" + "Year: " + JSON.parse(body).Year + "\n" + "IMDB rating: " + JSON.parse(body).Ratings[0].Value + "\n" + "Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors;
      console.log("***************************************\n" + "Movie Info:\n" + movieInfo + "\n***************************************");
      //add movie info to log.txt
      fs.appendFile("log.txt", "***************************************\n" + "Movie Info:\n" + movieInfo + "\n***************************************\n", function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}


function doWhatItSays(args) {
  //sets up read file
  var fs = require("fs");
  //pre-load array to simulate process.argv
  var argArr = ["zero", "one"];
  //retrieve text from random.txt
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    //split string where the commas are into an array
    var dataArr = data.split(",");
    //loop through dataArr and push those items into the preloaded argArr so the new items begin at index 2
    for (var i = 0; i < dataArr.length; i++) {
      argArr.push(dataArr[i]);
    }
    //call functions based on index 2 of argArr
    switch (argArr[2]) {
      case "my-tweets":
        myTweets();
        break;
      case "spotify-this-song":
        spotifyThisSong(argArr);
        break;
      case "movie-this":
        movieThis(argArr);
        break;
    }
  });
}
