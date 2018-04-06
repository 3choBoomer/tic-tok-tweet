const fileDb = require('./fileDb');

module.exports = {
    scheduleTweet: scheduleTweet
}

function scheduleTweet(req, res){
    //typically would have some validation here
    fileDb.getScheduledTweets()
        .then((scheduledTweets) => {
            scheduledTweets.push(req.body);
            return scheduledTweets;
        })
        .then(fileDb.saveScheduledTweets)
        .then((success)=> {
            if (success){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(500);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });

};