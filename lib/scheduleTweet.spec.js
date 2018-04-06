const expect = require("chai").expect;
const requestMock = require("express-request-mock");
const mockFs = require("mock-fs");
const path = require("path");
const fileDb = require("./fileDb");
let scheduleTweet = require("./scheduleTweet");

const scheduledTweetsFile = path.join(__dirname, "../db/scheduledTweets.json");

const mockFileData = [{ foo: "bar", baz: "buz" }, { bar: "foo", buz: "baz" }];
let req, res;

describe("scheduleTweet", () => {
  beforeEach(() => {
    let mockFsConfig = {};
    mockFsConfig[scheduledTweetsFile] = JSON.stringify(mockFileData);
    mockFs(mockFsConfig);
  });

  afterEach(() => {
    mockFs.restore();
  });

  it("writes what you send it to the db", done => {
    fileDb.getScheduledTweets().then(jsonObj => {
      expect(jsonObj).to.be.a("array");
      expect(jsonObj).to.have.a.lengthOf(2);
    });
    requestMock(scheduleTweet.scheduleTweet, { foo: "bar" }).then(mock => {
      setTimeout(() => {
        fileDb
          .getScheduledTweets()
          .then(jsonObj => {
            expect(jsonObj).to.be.a("array");
            expect(jsonObj).to.have.a.lengthOf(3);
          })
          .then(done);
      }, 1000);
    });
  });

  it("returns a 200", done => {
    requestMock(scheduleTweet.scheduleTweet, { baz: "bar" })
      .then(mock => {
        const res = mock.res;
        expect(res).to.be.a("object");
        expect(res.statusCode).to.be.equal(200);
      })
      .then(done);
  });
});
