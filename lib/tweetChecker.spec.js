const expect = require('chai').expect;
const mockFs = require('mock-fs');
const path = require('path');

const fileDb = require('./fileDb');
const tweetChecker = require('./tweetChecker');

let originalTimeout;
const scheduledTweetsFile = path.join(__dirname, '../db/scheduledTweets.json');

const mockFileData = [
    {"dateTime":new Date(new Date().getTime() + -4 * 1000),"oauthToken":"14604710-svL4PQhsu15pGlspkKzvahRH5AFoNfYJZdilK3Zxu","oauthSecret":"YNz2gWhNVIFd1QQm18Z8aDXX4KEV46RlPfzn1FAfwVtng","screenName":"3choboomer","tweetText":"adfads"},
    {"dateTime":"2018-04-20T03:42:00.000Z","oauthToken":"14604710-svL4PQhsu15pGlspkKzvahRH5AFoNfYJZdilK3Zxu","oauthSecret":"YNz2gWhNVIFd1QQm18Z8aDXX4KEV46RlPfzn1FAfwVtng","screenName":"3choboomer","tweetText":"adfads"}
];

describe('tweetChecker Tests', () =>{

  beforeEach(()=>{
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    let mockFsConfig = {}
    mockFsConfig[scheduledTweetsFile] = JSON.stringify(mockFileData);
    mockFs(mockFsConfig);
  });
  
  afterEach(() => {
    mockFs.restore();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
    
  it('removes an item from the db when it should be sent', (done) => {
    fileDb.getScheduledTweets()
      .then((jsonObj)=>{
        expect(jsonObj).to.be.a('array');
        expect(jsonObj).to.have.a.lengthOf(2);
      });
    tweetChecker();
    setTimeout(()=>{
        fileDb.getScheduledTweets()
        .then((jsonObj)=>{
            expect(jsonObj).to.be.a('array');
            expect(jsonObj).to.have.a.lengthOf(1);
        }).then(done); 
    }, 5000)
  });
});
