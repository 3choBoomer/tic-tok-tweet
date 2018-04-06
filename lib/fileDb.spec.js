const expect = require("chai").expect;
const mockFs = require("mock-fs");
const path = require("path");

const fileDb = require("./fileDb");

const scheduledTweetsFile = path.join(__dirname, "../db/scheduledTweets.json");

const mockFileData = [{ foo: "bar", baz: "buz" }, { bar: "foo", buz: "baz" }];

describe("fileDb Tests", () => {
  beforeEach(() => {
    let mockFsConfig = {};
    mockFsConfig[scheduledTweetsFile] = JSON.stringify(mockFileData);
    mockFs(mockFsConfig);
  });

  afterEach(() => mockFs.restore());

  it("returns a json Object when you call get", done => {
    fileDb
      .getScheduledTweets()
      .then(jsonObj => {
        expect(jsonObj).to.be.a("Array");
        expect(jsonObj[0]).to.have.a.property("foo");
        expect(jsonObj[0]).to.have.a.property("baz");
      })
      .then(done);
  });

  it("saves a json Object to a file when you call save", done => {
    fileDb
      .saveScheduledTweets({ jimmy: "crackCorn" })
      .then(success => {
        expect(success).to.be.true;
      })
      .then(fileDb.getScheduledTweets)
      .then(jsonObj => {
        expect(jsonObj).to.be.a("object");
        expect(jsonObj).to.have.a.property("jimmy");
        expect(jsonObj.jimmy).to.not.be.empty;
      })
      .then(done);
  });
});
