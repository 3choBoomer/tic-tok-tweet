const promisify = require('util-promisify');
const fs = require('fs');
const path = require('path');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const scheduledTweetsFile = '../db/scheduledTweets.json';

module.exports = {
    getScheduledTweets: readTweetsFileAsync,
    saveScheduledTweets: saveTweetsFileAsync
}

function readTweetsFileAsync(){
    return readFileAsync(path.join(__dirname, scheduledTweetsFile), {encoding: 'utf8'})
        .then(contents => {
            return JSON.parse(contents);
        })
        .catch(error => {
            throw error;
        });
}

function saveTweetsFileAsync(jsonToBeWritten){
    return writeFileAsync(path.join(__dirname, scheduledTweetsFile), JSON.stringify(jsonToBeWritten), {encoding: 'utf8'})
        .then(() => {
            return true;
        })
        .catch(error => {
            throw error;
        });
}

