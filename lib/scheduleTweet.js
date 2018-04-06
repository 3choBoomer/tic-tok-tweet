const config = require('ih-config');
const fileDb = require('./fileDb');

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

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