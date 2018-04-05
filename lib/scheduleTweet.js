const config = require('ih-config');
const Twitter = require('twitter-lite');
const crypto = require('crypto');

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');

module.exports = {
    scheduleTweet: scheduleTweet
}

function scheduleTweet(req, res){
    let scheduledTime = new Date(req.body.dateTime);
    console.log(scheduledTime.toISOString());
    console.log(scheduledTime);

};