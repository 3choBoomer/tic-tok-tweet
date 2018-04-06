const Twitter = require('twitter-lite');
const config = require('ih-config');

module.exports = function(tweet) {
  //typically would have some validation here
  const client = new Twitter({
    subdomain: "api",
    consumer_key: config.get("twitterApiKey"),
    consumer_secret: config.get("twitterApiSecret"),
    access_token_key: tweet.oauthToken,
    access_token_secret: tweet.oauthSecret
  });

  client
    .post("statuses/update", null, {status: tweet.tweetText})
    .then(results => {
      console.log("results", results);
    })
    .catch(console.error);
};
