const Twitter = require("twitter-lite");
const config = require("ih-config");

module.exports = function(tweet) {
  //typically would have some validation here
  let twitterConfig = {
    subdomain: "api",
    consumer_key: config.get("twitterApiKey"),
    consumer_secret: config.get("twitterApiSecret"),
    access_token_key: tweet.oauthToken,
    access_token_secret: tweet.oauthSecret
  };
  const client = new Twitter(twitterConfig);

  return client
    .post("statuses/update", null, { status: tweet.tweetText })
    .then(results => {
      if (results.errors) {
        console.error(results);
        return false;
      }
      return true;
    })
    .catch(console.error);
};
