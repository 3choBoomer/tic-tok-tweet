const fileDb = require("./fileDb");

module.exports = {
  scheduleTweet: scheduleTweet
};

function scheduleTweet(req, res) {
  //typically would have some validation here
  fileDb
    .getScheduledTweets()
    .then(scheduledTweets => {
      scheduledTweets.push(req.body);
      return scheduledTweets;
    })
    .then(fileDb.saveScheduledTweets)
    .then(success => {
      if (success) {
        res.status(200).json({});
      } else {
        res.status(500).json({});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}
