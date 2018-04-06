const fileDb = require('./fileDb');
const sendTweet = require('./sendTweet');
const Promise = require('bluebird');

function checkFoScheduledTweets(){
    console.log('checking');
    var tweets;
    Promise.resolve(fileDb.getScheduledTweets())
        .tap(stashTweets)
        .filter(getTweetsToSend)
        .filter(sendTweets)
        .map(removeSentTweets)
        .finally(()=>{
            console.log('tweets length to db', tweets.length);
            fileDb.saveScheduledTweets(tweets)}
        );

        function removeSentTweets(item){
            let i = tweets.indexOf(item);
            tweets.splice(i,1);
        }

        function stashTweets(tweetsFromDb){
            tweets = tweetsFromDb;
            console.log('tweets length from db', tweets.length);
        }
}



function getTweetsToSend(item){
    const tweetDt = new Date(item.dateTime);
    return (tweetDt <= new Date())
}

function sendTweets(item){
    return sendTweet(item).then((result)=>{
        if (result === true){
            return item;
        }
    });
}

function out(item){
    console.log('sent' + JSON.stringify(item));
    console.log();
}

module.exports = function(){

    setInterval(checkFoScheduledTweets, 3 * 1000);

    
};