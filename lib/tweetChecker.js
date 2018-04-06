const fileDb = require("./fileDb");
const sendTweet = require("./sendTweet");
const Promise = require("bluebird");

function checkFoScheduledTweets() {
  console.log("checking");
  var tweets;
  Promise.resolve(fileDb.getScheduledTweets())
    .tap(stashTweets)
    .filter(getTweetsToSend)
    .filter(sendTweets)
    .map(removeSentTweets)
    .finally(() => {
      console.log("tweets length to db", tweets.length);
      fileDb.saveScheduledTweets(tweets);
    });

  function removeSentTweets(item) {
    let i = tweets.indexOf(item);
    tweets.splice(i, 1);
  }

  function stashTweets(tweetsFromDb) {
    tweets = tweetsFromDb;
    console.log("tweets length from db", tweets.length);
  }
}

function getTweetsToSend(item) {
  const tweetDt = new Date(item.dateTime);
  return tweetDt <= new Date();
}

function sendTweets(item) {
  return sendTweet(item).then(result => {
    if (result === true) {
      return item;
    } else {
      console.error('error sending tweet', JSON.stringify(item));
      //return the item so it can be removed from the db since we can't send it.
      return item;
    }
  });
}

module.exports = function() {
  setInterval(checkFoScheduledTweets, 3 * 1000);
};
